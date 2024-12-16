// const VIDEO_HOST = 'https://jxjyseiglearning.o-learn.cn'
export const VIDEO_PATH = '/student';
export const NEXT_BTN_CLASS = '.whaty-video-layer .el-message-box .global-confirm-button'


export const customizeDom = () => {
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
  // if (activeDom && activeDom.classList.contains('link-container')) {
  //   console.log('链接');
  //   return true
  // }
  // if (activeDom && activeDom.classList.contains('document-container')) {
  //   console.log('文档');
  //   return true
  // }
  // if (activeDom && activeDom.classList.contains('datum-container')) {
  //   console.log('文档');
  //   return true
  // }
  return true
}

export const autoNextPlay = () => {
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

// 考试循环提交 - 暂时作废
export const loopSubmit = (node: any, ind: number = 0) => {
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

export const onClickNextButton = () => {
  const nextButton = document.querySelector(NEXT_BTN_CLASS) // 替换为实际的按钮选择器
  if (nextButton) {
    console.log("video next click");
    (nextButton as HTMLElement).click()
    setTimeout(() => {
      autoNextPlay()
    }, 3000)
  }
}
