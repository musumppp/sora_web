<template>
    <div id="link_to_tieba">
        <p style="color:var(--brand-strong);font-size:clamp(0.6rem, 0.5rem + 0.5vw, 1.5rem);">友情链接：</p>  
        <a href="https://tieba.baidu.com/f?kw=水无月空" class="the_link" target="_blank" rel="noopener noreferrer">水无月空吧</a>
        <a href="https://mzh.moegirl.org.cn/%E6%B0%B4%E6%97%A0%E6%9C%88%E7%A9%BA" class="the_link" target="_blank" rel="noopener noreferrer">萌娘百科</a>
        <p id="announce">水无月空站更多功能等待开发中!</p>
    </div>

</template>
<script setup>

</script>
<style scoped>
#link_to_tieba{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6.5vh;
    max-height: 80px;
    width: 100%;
    background-color: var(--surface-2);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.the_link{
    margin-right: 1.5vw;
    text-decoration: none;
    color: var(--brand-strong);
    font-size: clamp(0.6rem, 0.5rem + 0.5vw, 1.5rem);
}
.the_link:hover{
    text-decoration: underline;
    color: var(--brand);
}
#announce{
    font-size: clamp(0.4rem, 0.4rem + 0.5vw, 1rem);
    color: var(--ink-4);
    position: absolute;
    left: 10px;
}

/* ============================================================
 * 窄屏：桌面端保持原样，只修手机上的两个问题
 *   1. #announce 是 position:absolute，会脱离 footer 浮到页面左边、压住内容
 *   2. 固定 height:6.5vh 装不下换行后的内容
 * ============================================================ */
@media (max-width: 820px) {
    #link_to_tieba {
        flex-wrap: wrap;
        height: auto;
        min-height: 6.5vh;
        max-height: none;
        padding: 0.7rem 1rem;
        gap: 0.35rem 0.9rem;
    }
    .the_link {
        margin-right: 0;
        font-size: 0.8rem;
    }
    #announce {
        position: static;
        width: 100%;
        text-align: center;
        margin: 0.25rem 0 0;
        font-size: 0.72rem;
    }
}

/* 触摸设备：链接的 hover 下划线在触摸屏上会「粘住」 */
@media (hover: none) and (pointer: coarse) {
    .the_link:hover {
        text-decoration: none;
        color: var(--brand-strong);
    }
}
</style>