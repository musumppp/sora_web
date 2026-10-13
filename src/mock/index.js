/**
 * 本地测试数据拦截器 —— 仅在 `npm run dev` 时生效
 * ---------------------------------------------------------------
 * 原理：把 window.fetch 包一层，命中路由表的请求直接返回本地数据，
 * 不发出网络请求（因此 vite.config.js 里指向 localhost:8000 的 proxy 也不会被触发）。
 * 未命中的请求原样放行。
 *
 * 关闭方法：把下面 MOCK_ENABLED 改成 false
 *
 * 生产构建会被完全剔除：整个逻辑包在 `if (import.meta.env.DEV && MOCK_ENABLED)` 里，
 * 打包时该块会被静态判定为 false 而移除，data.js 随之被 tree-shake。
 */
import * as D from './data.js'

const MOCK_ENABLED = true

if (import.meta.env.DEV && MOCK_ENABLED) {
  installMock()
}

function installMock() {
  const originalFetch = window.fetch.bind(window)

  /* 模拟网络延迟，让骨架 / loading 态能被观察到 */
  const DELAY = 220

  /* ============================================================
   * 路由表：method + path 命中即返回（path 不含 query）
   * ============================================================ */
  const routes = [
    /* ---------------- 账号 ---------------- */
    { m: 'POST', p: '/log/login', r: () => D.login() },
    { m: 'POST', p: '/log/register', r: () => D.register() },
    { m: 'GET', p: '/log/logout', r: () => D.logout() },
    { m: 'GET', p: '/log/getuserinfo', r: () => D.userinfo() },
    { m: 'POST', p: '/log/veryfyexpired', r: () => D.verifyExpired() },
    { m: 'GET', p: '/log/veryfyexpired', r: () => D.verifyExpired() },
    { m: 'GET', p: '/log/get_history_check_date', r: () => D.checkHistory() },
    { m: 'POST', p: '/log/check_in', r: () => D.checkIn() },

    /* ---------------- 资源 ---------------- */
    { m: 'GET', p: '/resource/getDrawModel', r: () => D.drawModel() },
    { m: 'GET', p: '/resource/getVoiceModel', r: () => D.voiceModel() },
    { m: 'GET', p: '/resource/getGameResource', r: () => D.gameResource() },
    { m: 'GET', p: '/resource/getCommunityResource', r: () => D.communityResource() },
    { m: 'GET', p: '/resource/getAnnounceList', r: () => D.announceList() },
    { m: 'GET', p: '/resource/getMessageList', r: () => D.messageList() },
    { m: 'GET', p: '/resource/getRecentActivity', r: () => D.recentActivity() },
    { m: 'GET', p: '/resource/video-share', r: () => D.videoShare() },

    { m: 'POST', p: '/resource/addMessage', r: () => D.addMessage() },
    { m: 'POST', p: '/resource/uploadInfo', r: () => D.uploadInfo() },
    { m: 'POST', p: '/resource/upload', r: () => D.upload() },
    {
      m: 'POST',
      p: '/resource/get_detail_info',
      r: (_q, body) => D.resourceDetail(body),
    },

    /* ---------------- 相册 ---------------- */
    {
      m: 'GET',
      p: '/album/albumresource',
      r: (q) => {
        const page = parseInt(q.get('page') || '1', 10)
        const size = parseInt(q.get('size') || '10', 10)
        return D.albumPage(page, size)
      },
    },
  ]

  /* ============================================================
   * 工具
   * ============================================================ */
  function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const sleep = ms => new Promise(res => setTimeout(res, ms))

  /* 接口前缀，用于兜底（未覆盖的请求不再打到 proxy） */
  const PREFIXES = ['/log/', '/album/', '/resource/']

  /* ============================================================
   * 接管 fetch
   * ============================================================ */
  window.fetch = async function (input, init = {}) {
    let rawUrl = ''
    let method = 'GET'
    let body = null

    if (typeof input === 'string') {
      rawUrl = input
    } else if (input && typeof input === 'object' && input.url) {
      /* Request 对象 */
      rawUrl = input.url
      method = (input.method || 'GET').toUpperCase()
    }

    if (init && init.method) method = init.method.toUpperCase()

    /* 解析 body（只处理 JSON，FormData 忽略） */
    if (init && typeof init.body === 'string') {
      try {
        body = JSON.parse(init.body)
      } catch {
        body = null
      }
    }

    /* 只处理站内相对路径；其它（HMR、图片等）原样放行 */
    let path = rawUrl
    let query = new URLSearchParams()
    if (rawUrl.startsWith('/')) {
      const [p, qs] = rawUrl.split('?')
      path = p
      query = new URLSearchParams(qs || '')
    } else {
      return originalFetch(input, init)
    }

    /* ---- 命中路由 ---- */
    const hit = routes.find(r => r.p === path && r.m === method)
    if (hit) {
      await sleep(DELAY)
      const data = hit.r(query, body)
      console.log(
        `%c[MOCK]%c ${method} ${rawUrl}`,
        'background:#4fa97c;color:#fff;padding:1px 5px;border-radius:3px',
        'color:#8b858d'
      )
      return json(data)
    }

    /* ---- 兜底：站内接口前缀但没覆盖 → 返回 404，避免打到空后端 ---- */
    if (PREFIXES.some(pre => path.startsWith(pre))) {
      await sleep(DELAY)
      console.warn(
        `%c[MOCK]%c 未覆盖的接口 ${method} ${rawUrl} → 已返回 404`,
        'background:#c46a87;color:#fff;padding:1px 5px;border-radius:3px',
        'color:#8b858d'
      )
      return json({ status: 404, detail: '本地测试数据未覆盖此接口' }, 404)
    }

    /* ---- 其它请求放行 ---- */
    return originalFetch(input, init)
  }

  /* ============================================================
   * 控制台开关：切换登录态（首页签到区 / 用户中心）
   * ============================================================ */
  window.__mock = {
    login() {
      localStorage.setItem('user-store', JSON.stringify({ log_status: 'on' }))
      console.log('%c已切到【登录态】，刷新页面生效', 'color:#4fa97c;font-weight:bold')
    },
    logout() {
      localStorage.setItem('user-store', JSON.stringify({ log_status: 'off' }))
      console.log('%c已切到【未登录态】，刷新页面生效', 'color:#c46a87;font-weight:bold')
    },
  }

  console.log(
    '%c本地测试数据已启用%c\n' +
      '  · 所有 /log /album /resource 请求由本地数据接管，不会打到后端\n' +
      '  · 切换登录态：__mock.login() / __mock.logout()（改完刷新页面）\n' +
      '  · 关闭：把 src/mock/index.js 里的 MOCK_ENABLED 改成 false',
    'background:#c46a87;color:#fff;padding:3px 10px;border-radius:4px;font-weight:bold',
    'color:#5f5a5f'
  )
}
