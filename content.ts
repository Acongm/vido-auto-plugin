import type { PlasmoCSConfig } from "plasmo"
import { autoNextPlay, customizeDom, loopSubmit, onClickNextButton, VIDEO_PATH } from "./utils";

export const config: PlasmoCSConfig = {
  matches: ['https://jxjyseiglearning.o-learn.cn/*']
}

window.addEventListener("load", () => {
  console.log(
    "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  )

  // 创建一个新的 script 元素
  const scriptTag = document.createElement("script")
  scriptTag.textContent = `
     console.log('Hello from the injected script!');
     // 在这里可以添加任何你想要执行的 JavaScript 代码
   `
  // 将 script 元素添加到 body 中
  document.body.appendChild(scriptTag)

  setTimeout(() => {
    const path = window.location.pathname
    console.log('path', path);

    if (path && path.includes(VIDEO_PATH)) {
      console.log('path.includes(videoPath)', path.includes(VIDEO_PATH));
      customizeDom()
      autoNextPlay()
    }
  }, 3000)

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node: any) => {
          if (node.nodeType === 1 && node.classList.contains('popup_layer')) {
            console.log('Modal inserted into the DOM');
            const isModalOpen = getComputedStyle(node).display !== 'none';
            if (isModalOpen) {
              console.log('Modal opened', node);
              loopSubmit(node, 0)
            }
          }
          if (node.tagName === "VIDEO") {
            node.addEventListener("ended", () => {
              console.log("video over 2")
              setTimeout(() => {
                console.log("setTimeout start")
                onClickNextButton()
              }, 2000)
            })
          }
        })
      }
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
})
