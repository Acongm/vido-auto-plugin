import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://jxjyseiglearning.o-learn.cn/*"]
}

const videoPath = '/learning/student/studentIndex.action'
const customizeDom = () => {
  document.body.style.background = "pink"
  document.querySelectorAll('.course_chapter_title').forEach((ele) => {
    ele.remove()
  })
  document.querySelectorAll('.course_chapter_list').forEach((ele) => {
    if (ele && ele.classList) {
      if (ele.classList) {
        ele.classList.remove('ng-hide');
      }
    }
    ele.childNodes.forEach((ele2: any) => {
      if (ele2 && ele2.classList) {
        if (ele2.classList) {
          ele2.classList.remove('ng-hide');
        }
      }
    })
  })
  const nameDom = document.querySelector('.course_name')
  if (nameDom) {
    nameDom.innerHTML = '自动播放中'
  }
}
const getIsDocAction = () => {
  const activeDom = document.querySelector('.courseware_menu_item.active')
  if (activeDom) {
    const activeDomName = activeDom.querySelector('.item_name')
    if (activeDomName) {
      return activeDomName.textContent === '文档'
    }
  }
  return false
}

const getNextPlayVideo = () => {
  // 获取所有 .course_chapter_item 元素
  let activeIndex = -1
  const items = document.querySelectorAll('.course_chapter_item');

  // 遍历这些元素
  items.forEach((item, ind) => {
    // 检查当前元素是否包含 active class
    if (item.classList.contains('active')) {
      activeIndex = ind
    }
  });
  if (activeIndex !== -1 && activeIndex < items.length - 1) {
    const dom = items[activeIndex + 1]
    if (dom) {
      return dom.querySelector('.section_title')
    }
  }
  return null
}

const autoNextPlay = () => {
  const isDocAction = getIsDocAction()
  if (isDocAction) {
    const nextDom = getNextPlayVideo()
    console.log('nextDom', nextDom);
    if (nextDom) {
      ; (nextDom as HTMLElement).click()
    }
  }
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
    if (path && path.includes(videoPath)) {
      customizeDom()
      autoNextPlay()
    }
  }, 3000)

  const handleClickNextButton = () => {
    const nextButton = document.querySelector(".layui-layer .layui-layer-btn0") // 替换为实际的按钮选择器
    if (nextButton) {
      console.log("video next click")
        ; (nextButton as HTMLElement).click()
      setTimeout(() => {
        autoNextPlay()
      }, 3000)
    }
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node: any) => {
        if (node.tagName === "VIDEO") {
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
