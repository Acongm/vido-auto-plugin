import type { PlasmoCSConfig } from "plasmo"

const VIDEO_HOST = 'https://jxjyseiglearning.o-learn.cn'
const VIDEO_PATH = '/student';
const NEXT_BTN_CLASS = '.whaty-video-layer .el-message-box .global-confirm-button'

export const config: PlasmoCSConfig = {
  matches: ['https://jxjyseiglearning.o-learn.cn/*']
}

const customizeDom = () => {
  // document.body.style.background = "pink"
  // document.querySelectorAll('.course_chapter_title').forEach((ele) => {
  //   ele.remove()
  // })
  // document.querySelectorAll('.course_chapter_list').forEach((ele) => {
  //   if (ele && ele.classList) {
  //     if (ele.classList) {
  //       ele.classList.remove('ng-hide');
  //     }
  //   }
  //   ele.childNodes.forEach((ele2: any) => {
  //     if (ele2 && ele2.classList) {
  //       if (ele2.classList) {
  //         ele2.classList.remove('ng-hide');
  //       }
  //     }
  //   })
  // })
  // const nameDom = document.querySelector('.course_name')
  // if (nameDom) {
  //   nameDom.innerHTML = '自动播放中'
  // }
  const titleDom: any = document.querySelectorAll('.container-header')?.[1]?.querySelector('.menu-item.active')
  if (titleDom) {
    titleDom.textContent = '自动播放中...'
  }
  document.querySelectorAll('.el-collapse-item__wrap').forEach((y: any) => y.style.display = 'block')
  document.querySelectorAll('.el-collapse-item__header').forEach((y: any) => y.style.display = 'none')
  // const targetElements = document.querySelectorAll('.el-progress.el-progress--circle.is-success.el-tooltip__trigger[aria-valuenow="100"]');

  /* targetElements.forEach(targetElement => {
    let parentElement = targetElement.parentElement;
    while (parentElement && !parentElement.classList.contains('el-collapse-item__wrap')) {
      parentElement = parentElement.parentElement;
    }

    if (parentElement) {
      parentElement.style.display = 'none';
    }
  }); */
}

const getNextPlayDom = () => {
  let activeIndex = -1
  const items = document.querySelectorAll('.three-content')
  // 遍历这些元素
  items.forEach((item, ind) => {
    // 检查当前元素是否包含 active class
    if (item.classList.contains('active')) {
      activeIndex = ind
    }
  });
  console.log('items.length', items.length);
  console.log('activeIndex', activeIndex);

  if (items.length >= 1 && activeIndex !== -1) {
    return items[activeIndex + 1]
  }
  return null

}
const getNowIsDocAction = () => {
  const activeDom = document.querySelector('.learning-outline-item-container>div')
  if (activeDom && activeDom.classList.contains('com-outline-video-container')) {
    console.log('视屏');
    return false
  }
  if (activeDom && activeDom.classList.contains('link-container')) {
    console.log('链接');
    return true
  }
  if (activeDom && activeDom.classList.contains('document-container')) {
    console.log('文档');
    return true
  }
  if (activeDom && activeDom.classList.contains('datum-container')) {
    console.log('文档');
    return true
  }
  return true
}

const autoNextPlay = () => {
  const isDocAction = getNowIsDocAction()
  if (isDocAction) {
    const nextDom = getNextPlayDom()
    console.log('nextDom', nextDom);
    if (nextDom) {
      (nextDom as HTMLElement).click()
      setTimeout(() => {
        autoNextPlay()
      }, 3000)
    }
  }
}

const loopSubmit = (node: any, ind: number = 0) => {
  setTimeout(() => {
    const items = node.querySelectorAll('.checkbox-inline')
    if (items && items[ind]) {
      console.log('items[ind]', items[ind]);
      console.log('button', node.querySelector('.whaty-button'));

      items[ind].click();
      setTimeout(() => {
        node.querySelector('.whaty-button').click()
        setTimeout(() => {
          if (node.querySelector('.whaty-button').textContent === '重做' && ind < 3) {
            node.querySelector('.whaty-button').click()
            loopSubmit(node, ind + 1)
          } else {
            node.querySelector('.whaty-button').click()
          }
        }, 1000)
      }, 1000)
    }
  }, 2000)
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

  const handleClickNextButton = () => {
    const nextButton = document.querySelector(NEXT_BTN_CLASS) // 替换为实际的按钮选择器
    if (nextButton) {
      console.log("video next click");
      (nextButton as HTMLElement).click()
      setTimeout(() => {
        autoNextPlay()
      }, 3000)
    }
  }

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
                handleClickNextButton()
              }, 2000)
            })
          }
        })
      }
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
})
