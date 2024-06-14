import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://jxjyseiglearning.o-learn.cn/*"]
}

window.addEventListener("load", () => {
  console.log(
    "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  )

  document.body.style.background = "pink"

  // 创建一个新的 script 元素
  const scriptTag = document.createElement("script")
  scriptTag.textContent = `
     console.log('Hello from the injected script!');
     // 在这里可以添加任何你想要执行的 JavaScript 代码
   `
  // 将 script 元素添加到 body 中
  document.body.appendChild(scriptTag)

  const handleClickNextButton = () => {
    console.log("handleClickNextButton 1")
    const nextButton = document.querySelector(".layui-layer .layui-layer-btn0") // 替换为实际的按钮选择器
    console.log("handleClickNextButton 2", nextButton)
    if (nextButton) {
      console.log("video next click")
      ;(nextButton as HTMLElement).click()
    }
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node: any) => {
        if (node.tagName === "VIDEO") {
          console.log("video load tagName")
          node.addEventListener("load", () => {
            console.log("video load")
          })
          node.addEventListener("ended", () => {
            console.log("video over 2")
            setTimeout(() => {
              console.log("setTimeout start")
              handleClickNextButton()
            }, 2000)
          })
        }
      })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
})
