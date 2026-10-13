/**
 * 本地测试数据（只在 npm run dev 时生效）
 * ---------------------------------------------------------------
 * 生产构建会被完全剔除：这些导出只在 `if (import.meta.env.DEV)` 块内被引用，
 * Vite/Rollup 打包时整个模块都会被 tree-shake 掉。
 */

/* ================================================================
 * 占位图：内联 SVG（data URI），不依赖网络，改样式时能直接看出
 * 图片位置 / 尺寸 / 圆角 / object-fit 是否正确
 * ================================================================ */
export function placeholder(label, hue) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="350" height="350">` +
    `<rect width="350" height="350" fill="hsl(${hue},52%,86%)"/>` +
    `<circle cx="175" cy="132" r="50" fill="hsl(${hue},48%,74%)"/>` +
    `<path d="M82 302 Q175 196 268 302 Z" fill="hsl(${hue},48%,74%)"/>` +
    `<text x="175" y="333" font-family="Microsoft YaHei,sans-serif" font-size="19" ` +
    `fill="hsl(${hue},34%,36%)" text-anchor="middle">${label}</text>` +
    `</svg>`
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

/* 给一条数据换一个色相，避免整页同色 */
const hueOf = i => (i * 47 + 330) % 360

/* ================================================================
 * 账号相关  /log/*
 * ================================================================ */

/** POST /log/login */
export const login = () => ({ status_code: 200, message: '登录成功（本地测试数据）' })

/** POST /log/register */
export const register = () => ({ status_code: 200 })

/** GET /log/logout */
export const logout = () => ({ status_code: 200 })

/** GET /log/getuserinfo */
export const userinfo = () => ({
  status: 200,
  username: '测试提督',
  first_enter_time: '2026-01-15 21:30:00',
  total_check_times: 87,
  constant_check_times: 12,
})

/** POST /log/veryfyexpired */
export const verifyExpired = () => ({ status: 200 })

/** GET /log/get_history_check_date
 *  lastest_check_time 决定首页签到区是「签到按钮」还是「已签到」
 *  —— 这里给昨天的日期，所以默认显示签到按钮；想测「已签到」态就改成今天 */
export const checkHistory = () => {
  const today = new Date()
  const pad = n => String(n).padStart(2, '0')
  const d = n => `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(n)}`

  /* 本月已签到的日期（用于日历上的绿色圈） */
  const checked = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]

  const y = new Date(today.getTime() - 86400000)
  const yesterday = `${y.getFullYear()}-${pad(y.getMonth() + 1)}-${pad(y.getDate())} 23:41:00`

  return {
    status: 200,
    check_date: checked.map(d),
    constant_check_times: 12,
    total_check_times: 87,
    lastest_check_time: yesterday,
  }
}

/** POST /log/check_in */
export const checkIn = () => ({ status_code: 200, message: '签到成功' })

/* ================================================================
 * 资源相关  /resource/*
 * ================================================================ */

/** GET /resource/getDrawModel */
export const drawModel = () => ({
  status: 200,
  draw_model_title: [
    '暮双的 LoRA 模型 第一代',
    '暮双的 LoRA 模型 第二代',
    'Sora Style 基础模型',
    '空 表情差分包',
  ],
  resource_name: ['lora-v1', 'lora-v2', 'sora-style-base', 'sora-face-pack'],
})

/** GET /resource/getVoiceModel */
export const voiceModel = () => ({
  status: 200,
  voice_model_title: [
    '空 语音合成模型 beta',
    'Sora Voice v1（GPT-SoVITS）',
    '空 全语音数据集',
  ],
  resource_name: ['voice-beta', 'sora-gpt-sovits', 'sora-voice-dataset'],
})

/** GET /resource/getGameResource */
export const gameResource = () => ({
  status: 200,
  game_resource_title: [
    'BALDR SKY DIVE 游戏本体',
    'BALDR SKY 全 CG 提取包',
    '空 全立绘提取包（含差分）',
    '游戏 BGM 无损合集',
    '设定集扫图（已修复）',
  ],
  resource_name: ['bsd-game', 'bsd-cg-pack', 'sora-sprite-pack', 'bsd-bgm', 'artbook-fixed'],
})

/** GET /resource/getCommunityResource */
export const communityResource = () => ({
  status: 200,
  community_resource_title: [
    '同人图合集 2024',
    '同人图合集 2025',
    '空 主题曲翻唱集',
    '同人文选集',
  ],
  resource_name: ['doujin-2024', 'doujin-2025', 'cover-collection', 'fanfic'],
})

/** POST /resource/get_detail_info */
export const resourceDetail = (body) => ({
  status: 200,
  title: body?.resource_name ? `资源详情 · ${body.resource_name}` : '资源详情（本地测试数据）',
  description:
    '这是本地测试数据，用于预览详情页排版。\n\n' +
    '正式环境这里会显示资源的说明文字、使用方式、注意事项等内容。\n' +
    '这一段故意写长一点，方便看多行文本的行高、换行、间距是否符合预期。',
  resource_url: 'https://example.com/resource.zip',
})

/** GET /resource/getAnnounceList */
export const announceList = () => ({
  status: 200,
  category: ['weihu', 'weihu', 'gonggao', 'gonggao', 'gonggao'],
  content: [
    '服务器将于本周日凌晨 2:00-4:00 进行维护（本地测试数据）',
    '近期相册上传通道偶发超时，正在排查',
    '本站为个人非营利站点，所有资源仅供学习交流',
    '若发现资源失效，请通过 B 站私信或 QQ 邮箱联系站长',
    '看板娘首次加载需要下载立绘与语音，请稍等几秒再点击',
  ],
})

/** GET /resource/getMessageList */
export const messageList = () => ({
  status: 200,
  content: [
    '空は永遠に —— 愿这座碑一直都在',
    '第一次来，感觉站做得很用心，看板娘好可爱',
    '生日快乐，空。',
    '首页改版之后清爽多了',
  ],
  time: [
    '2026-10-11 20:14:00',
    '2026-10-10 15:02:00',
    '2026-10-09 22:37:00',
    '2026-10-08 09:12:00',
  ],
  username: ['Sora_Archive', '访客 1024', '月见', '提督 A'],
})

/** POST /resource/addMessage */
export const addMessage = () => ({ status: 200 })

/** POST /resource/uploadInfo */
export const uploadInfo = () => ({ status: 200 })

/** POST /resource/upload */
export const upload = () => ({ status: 200 })

/** GET /resource/getRecentActivity —— 首页「站内动态」时间线 */
export const recentActivity = () => ({
  status: 200,
  list: [
    { type: 'img', title: '上传了 3 张 AI 创作 · 夏日祭系列', time: '10-11 20:14' },
    { type: 'res', title: '新增语音包 Sora Mascot 50', time: '10-10 15:02' },
    { type: 'msg', title: '「空は永遠に」留下了留言', time: '10-09 22:37' },
    { type: 'sys', title: '首页改版完成，资料卡与日历重排', time: '10-09 23:33' },
    { type: 'img', title: '上传了 2 张 AI 创作 · 制服差分', time: '10-07 18:45' },
    { type: 'res', title: '设定集扫图修复完成（第 3 批）', time: '10-05 11:20' },
  ],
})

/** GET /resource/video-share —— 首页「视频推荐」（返回裸数组） */
export const videoShare = () => [
  { id: 1, title: '【BALDR SKY】水无月空 全剧情剪辑', url: 'https://www.bilibili.com/' },
  { id: 2, title: '水无月空 角色曲合集 / Restoration ～沈黙の空～', url: 'https://www.bilibili.com/' },
  { id: 3, title: 'BALDR SKY DIVE 2 空线 实况 P1', url: 'https://www.bilibili.com/' },
  { id: 4, title: '空 全立绘差分展示（含隐藏表情）', url: 'https://www.bilibili.com/' },
  { id: 5, title: '用 AI 还原水无月空 ｜ LoRA 训练记录', url: 'https://www.bilibili.com/' },
  { id: 6, title: '空站介绍：为一个角色建的碑', url: 'https://www.bilibili.com/' },
  { id: 7, title: 'BSD 音乐现场：Kotoko 相关曲目整理', url: 'https://www.bilibili.com/' },
]

/* ================================================================
 * 相册  /album/albumresource?page=&size=
 * ================================================================ */

/** 总图数（故意不是 10 的整数倍，便于验证「加载到底」逻辑） */
const ALBUM_TOTAL = 16

export const albumPage = (page, size) => {
  const start = (page - 1) * size
  const count = Math.max(0, Math.min(size, ALBUM_TOTAL - start))
  const original_url = []
  const show_url = []
  for (let i = 0; i < count; i++) {
    const idx = start + i
    original_url.push(placeholder(`原图 ${idx + 1}`, hueOf(idx)))
    show_url.push(placeholder(`缩略图 ${idx + 1}`, hueOf(idx)))
  }
  return { status: 200, original_url, show_url }
}
