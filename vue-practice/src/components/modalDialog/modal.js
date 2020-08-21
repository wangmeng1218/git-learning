
import XEUtils from 'xe-utils';
import GlobalConfig from '../../../node_modules/vxe-table/lib/conf'
import Modal from 'vxe-table/lib/modal/src/modal';
import { UtilTools, DomTools, GlobalEvent } from 'vxe-table/lib/tools'
import modalConfig from './conf'

export default {
    name: 'CusModal',
    extends: Modal,
    props: {
        contentId: {
            type: String,
            default: modalConfig.contentId
        },
        iframeUrl: String
    },
    mounted () {
        console.log(modalConfig)
        console.log(this.contentId)
        const { $listeners, $el, events = {}, transfer } = this
        if (this.value) {
            this.open()
        }
        this.recalculate()
        if (this.escClosable) {
            GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
        }
        if (this.contentId) {
            document.getElementById(this.contentId).appendChild($el)
        } else if (transfer) {
            document.body.appendChild($el)
        }
        // 触发 inserted 事件
        const type = 'inserted'
        const params = { type, $modal: this, $event: { type } }
        if ($listeners.inserted) {
            this.$emit('inserted', params)
        } else if (events.inserted) {
            events.inserted.call(this, params)
        }
    },
    watch: {
      contentVisible (value) {
        if (value) {
          this.$nextTick(function () {
            this.recalculate()
          })
        }
      }
    },
    render (h) {
        const { iframeUrl, $scopedSlots, slots = {}, vSize, type, resize, animat, loading, status, iconStatus, showFooter, zoomLocat, modalTop, dblclickZoom, contentVisible, visible, title, message, lockScroll, lockView, mask, isMsg, showTitleOverflow, destroyOnClose } = this
        const defaultSlot = $scopedSlots.default || slots.default
        const footerSlot = $scopedSlots.footer || slots.footer
        const headerSlot = $scopedSlots.header || slots.header
        const titleSlot = $scopedSlots.title || slots.title
        const operateBtnSlot = $scopedSlots.operateBtn || slots.operateBtn
        const headerOns = {
          mousedown: this.mousedownEvent
        }
        if (resize && dblclickZoom && type === 'modal') {
          headerOns.dblclick = this.toggleZoomEvent
        }
        return contentVisible ? h('div', {
          class: ['vxe-modal--wrapper', `type--${type}`, {
            [`size--${vSize}`]: vSize,
            [`status--${status}`]: status,
            'is--animat': animat,
            'lock--scroll': lockScroll,
            'lock--view': lockView,
            'is--mask': mask,
            'is--maximize': zoomLocat,
            'is--visible': contentVisible,
            'is--active': visible,
            'is--loading': loading
          }],
          style: {
            zIndex: this.modalZindex,
            top: modalTop ? `${modalTop}px` : null
          },
          on: {
            click: this.selfClickEvent
          }
        }, [
          h('div', {
            class: 'vxe-modal--box',
            on: {
              mousedown: this.boxMousedownEvent
            },
            ref: 'modalBox'
          }, [
            this.showHeader ? h('div', {
              class: ['vxe-modal--header', !isMsg && showTitleOverflow ? 'is--ellipsis' : ''],
              style: {
                cursor: this.iframeUrl ? 'default' : ''
              },
              on: headerOns
            }, headerSlot ? headerSlot.call(this, { $modal: this }, h) : [
              titleSlot ? titleSlot.call(this, { $modal: this }, h) : h('span', {
                class: 'vxe-modal--title'
              }, title ? UtilTools.getFuncText(title) : GlobalConfig.i18n('vxe.alert.title')),
              operateBtnSlot ? h('div', {
                  class: ['vxe-modal--operate']
              }, [
                operateBtnSlot.call(this, { $modal: this }, h)
              ]) : null,
              resize ? h('i', {
                class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? GlobalConfig.icon.MODAL_ZOOM_OUT : GlobalConfig.icon.MODAL_ZOOM_IN],
                attrs: {
                  title: GlobalConfig.i18n(`vxe.modal.zoom${zoomLocat ? 'Out' : 'In'}`)
                },
                on: {
                  click: this.toggleZoomEvent
                }
              }) : null,
              h('i', {
                class: ['vxe-modal--close-btn', 'trigger--btn', GlobalConfig.icon.MODAL_CLOSE],
                attrs: {
                  title: GlobalConfig.i18n('vxe.modal.close')
                },
                on: {
                  click: this.closeEvent
                }
              })
            ]) : null,
            h('div', {
              class: 'vxe-modal--body'
            }, [
              status ? h('div', {
                class: 'vxe-modal--status-wrapper'
              }, [
                h('i', {
                  class: ['vxe-modal--status-icon', iconStatus || GlobalConfig.icon[`MODAL_${status}`.toLocaleUpperCase()]]
                })
              ]) : null,
              h('div', {
                class: 'vxe-modal--content',
                style: {
                  overflow: iframeUrl ? 'hidden' : 'auto'
                }
              }, destroyOnClose && !visible ? [] : iframeUrl ? [
                h('iframe',{
                  attrs: {
                    src: iframeUrl,
                    frameborder: 0,
                    width: '100%',
                    height: '100%'
                  }
                })
              ] : (defaultSlot ? defaultSlot.call(this, { $modal: this }, h) : (XEUtils.isFunction(message) ? message.call(this, h) : message))),
              !isMsg ? h('div', {
                class: ['vxe-loading', {
                  'is--visible': loading
                }]
              }, [
                h('div', {
                  class: 'vxe-loading--spinner'
                })
              ]) : null
            ]),
            showFooter ? h('div', {
              class: 'vxe-modal--footer'
            }, destroyOnClose && !visible ? [] : (footerSlot ? footerSlot.call(this, { $modal: this }, h) : [
              type === 'confirm' ? h('vxe-button', {
                on: {
                  click: this.cancelEvent
                }
              }, GlobalConfig.i18n('vxe.button.cancel')) : null,
              h('vxe-button', {
                props: {
                  status: 'primary'
                },
                on: {
                  click: this.confirmEvent
                }
              }, GlobalConfig.i18n('vxe.button.confirm'))
            ])) : null,
            !isMsg && resize ? h('span', {
              class: 'vxe-modal--resize'
            }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(type => {
              return h('span', {
                class: `${type}-resize`,
                attrs: {
                  'data-type': type
                },
                on: {
                  mousedown: this.dragEvent
                }
              })
            })) : null
          ])
        ]) : null
    },
    methods: {
        recalculate () {
          if (this.contentVisible) {
            const { width, height } = this
            const modalBoxElem = this.getBox()
            modalBoxElem.style.width = width ? (isNaN(width) ? width : `${width}px`) : null
            modalBoxElem.style.height = height ? (isNaN(height) ? height : `${height}px`) : null
          }
          return this.$nextTick()
        },
        open () {
            const { events = {}, duration, visible, isMsg, remember } = this
            if (!visible) {
                const type = 'show'
                const params = { type, $modal: this, $event: { type } }
                if (!remember) {
                    this.recalculate()
                }
                this.visible = true
                this.contentVisible = false
                this.updateZindex()
                this.$emit('activated', params)
                setTimeout(() => {
                    this.contentVisible = true
                    this.$nextTick(() => {
                        if (events.show) {
                            events.show.call(this, params)
                        } else {
                            this.$emit('input', true)
                            this.$emit('show', params)
                        }
                      if (isMsg) {
                        this.addMsgQueue()
                        if (duration !== -1) {
                          setTimeout(this.close, XEUtils.toNumber(duration))
                        }
                      } else {
                        this.$nextTick(() => {
                          const { inited, marginSize, fullscreen, position } = this
                          if (!remember || !inited) {
                            const modalBoxElem = this.getBox()
                            const clientVisibleWidth = this.contentId ? document.getElementById(this.contentId).offsetWidth : document.documentElement.clientWidth || document.body.clientWidth
                            const clientVisibleHeight = this.contentId ? document.getElementById(this.contentId).offsetHeight : document.documentElement.clientHeight || document.body.clientHeight
                            const isPosCenter = position === 'center'
                            const { top, left } = isPosCenter ? { top: position, left: position } : Object.assign({}, position)
                            const topCenter = isPosCenter || top === 'center'
                            const leftCenter = isPosCenter || left === 'center'
                            let posTop = ''
                            let posLeft = ''
                            if (left && !leftCenter) {
                              posLeft = isNaN(left) ? left : `${left}px`
                            } else {
                              posLeft = `${Math.max(marginSize, clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2)}px`
                            }
                            if (topCenter) {
                              posTop = `${Math.max(marginSize, clientVisibleHeight / 2 - modalBoxElem.offsetHeight / 2)}px`
                            } else if (top && !topCenter) {
                              posTop = isNaN(top) ? top : `${top}px`
                            } else if (modalBoxElem.offsetHeight + modalBoxElem.offsetTop + marginSize > clientVisibleHeight) {
                              posTop = `${marginSize}px`
                            }
                            modalBoxElem.style.top = posTop
                            modalBoxElem.style.left = posLeft
                          }
                          if (!inited) {
                            this.inited = true
                            if (this.hasPosStorage()) {
                              this.restorePosStorage()
                            } else if (fullscreen) {
                              this.$nextTick(() => this.maximize())
                            }
                          }
                        })
                      }
                    })
                }, 10)
            }
        },
        maximize () {
            return this.$nextTick().then(() => {
                if (this.resize && !this.zoomLocat) {
                    const marginSize = this.marginSize
                    const modalBoxElem = this.getBox()
                    const { visibleHeight, visibleWidth } = DomTools.getDomNode()
                    this.zoomLocat = {
                        top: modalBoxElem.offsetTop,
                        left: modalBoxElem.offsetLeft,
                        width: modalBoxElem.offsetWidth + (modalBoxElem.style.width ? 0 : 1),
                        height: modalBoxElem.offsetHeight + (modalBoxElem.style.height ? 0 : 1)
                    }
                    Object.assign(modalBoxElem.style, {
                        top: `${marginSize}px`,
                        left: `${marginSize}px`,
                        width: this.contentId ? `${document.getElementById(this.contentId).offsetWidth - marginSize * 2}px` : `${visibleWidth - marginSize * 2}px`,
                        height: this.contentId ? `${document.getElementById(this.contentId).offsetHeight - marginSize * 2}px` : `${visibleHeight - marginSize * 2}px`
                    })
                    this.savePosStorage()
                }
            })
        },
        mousedownEvent (evnt) {
            if (!this.iframeUrl) {
              const { remember, storage, marginSize, zoomLocat } = this
              const modalBoxElem = this.getBox()
              if (!zoomLocat && evnt.button === 0 && !DomTools.getEventTargetNode(evnt, modalBoxElem, 'trigger--btn').flag) {
                evnt.preventDefault()
                const domMousemove = document.onmousemove
                const domMouseup = document.onmouseup
                const disX = evnt.clientX - modalBoxElem.offsetLeft
                const disY = evnt.clientY - modalBoxElem.offsetTop
                const { visibleHeight, visibleWidth } = DomTools.getDomNode()
                document.onmousemove = evnt => {
                  evnt.preventDefault()
                  const offsetWidth = modalBoxElem.offsetWidth
                  const offsetHeight = modalBoxElem.offsetHeight
                  const minX = marginSize
                  const maxX = this.contentId ? document.getElementById(this.contentId).offsetWidth - offsetWidth - marginSize - 1 : visibleWidth - offsetWidth - marginSize - 1
                  const minY = marginSize
                  const maxY = this.contentId ? document.getElementById(this.contentId).offsetHeight - offsetHeight - marginSize - 1 : visibleHeight - offsetHeight - marginSize - 1
                  let left = evnt.clientX - disX
                  let top = evnt.clientY - disY
                  if (left > maxX) {
                    left = maxX
                  }
                  if (left < minX) {
                    left = minX
                  }
                  if (top > maxY) {
                    top = maxY
                  }
                  if (top < minY) {
                    top = minY
                  }
                  modalBoxElem.style.left = `${left}px`
                  modalBoxElem.style.top = `${top}px`
                }
                document.onmouseup = () => {
                  document.onmousemove = domMousemove
                  document.onmouseup = domMouseup
                  if (remember && storage) {
                    this.$nextTick(() => {
                      this.savePosStorage()
                    })
                  }
                }
              }
            } else {
              return;
            }
        },
        dragEvent (evnt) {
            evnt.preventDefault()
            const { $listeners, marginSize, events = {}, remember, storage } = this
            let { visibleHeight, visibleWidth } = DomTools.getDomNode()
            if (this.contentId) {
                visibleHeight = document.getElementById(this.contentId).offsetHeight
                visibleWidth = document.getElementById(this.contentId).offsetWidth
            }
            const type = evnt.target.dataset.type
            const minWidth = XEUtils.toNumber(this.minWidth)
            const minHeight = XEUtils.toNumber(this.minHeight)
            const maxWidth = visibleWidth
            const maxHeight = visibleHeight
            const modalBoxElem = this.getBox()
            const domMousemove = document.onmousemove
            const domMouseup = document.onmouseup
            const clientWidth = modalBoxElem.clientWidth
            const clientHeight = modalBoxElem.clientHeight
            const disX = evnt.clientX
            const disY = evnt.clientY
            const offsetTop = modalBoxElem.offsetTop
            const offsetLeft = modalBoxElem.offsetLeft
            const params = { type: 'resize', $modal: this }
            document.onmousemove = evnt => {
                evnt.preventDefault()
                let dragLeft
                let dragTop
                let width
                let height
                switch (type) {
                case 'wl':
                    dragLeft = disX - evnt.clientX
                    width = dragLeft + clientWidth
                    if (offsetLeft - dragLeft > marginSize) {
                    if (width > minWidth) {
                        modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                        modalBoxElem.style.left = `${offsetLeft - dragLeft}px`
                    }
                    }
                    break
                case 'swst':
                    dragLeft = disX - evnt.clientX
                    dragTop = disY - evnt.clientY
                    width = dragLeft + clientWidth
                    height = dragTop + clientHeight
                    if (offsetLeft - dragLeft > marginSize) {
                    if (width > minWidth) {
                        modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                        modalBoxElem.style.left = `${offsetLeft - dragLeft}px`
                    }
                    }
                    if (offsetTop - dragTop > marginSize) {
                    if (height > minHeight) {
                        modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                        modalBoxElem.style.top = `${offsetTop - dragTop}px`
                    }
                    }
                    break
                case 'swlb':
                    dragLeft = disX - evnt.clientX
                    dragTop = evnt.clientY - disY
                    width = dragLeft + clientWidth
                    height = dragTop + clientHeight
                    if (offsetLeft - dragLeft > marginSize) {
                    if (width > minWidth) {
                        modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                        modalBoxElem.style.left = `${offsetLeft - dragLeft}px`
                    }
                    }
                    if (offsetTop + height + marginSize < visibleHeight) {
                    if (height > minHeight) {
                        modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                    }
                    }
                    break
                case 'st':
                    dragTop = disY - evnt.clientY
                    height = clientHeight + dragTop
                    if (offsetTop - dragTop > marginSize) {
                    if (height > minHeight) {
                        modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                        modalBoxElem.style.top = `${offsetTop - dragTop}px`
                    }
                    }
                    break
                case 'wr':
                    dragLeft = evnt.clientX - disX
                    width = dragLeft + clientWidth
                    if (offsetLeft + width + marginSize < visibleWidth) {
                    if (width > minWidth) {
                        modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                    }
                    }
                    break
                case 'sest':
                    dragLeft = evnt.clientX - disX
                    dragTop = disY - evnt.clientY
                    width = dragLeft + clientWidth
                    height = dragTop + clientHeight
                    if (offsetLeft + width + marginSize < visibleWidth) {
                        if (width > minWidth) {
                            modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                        }
                    }
                    if (offsetTop - dragTop > marginSize) {
                        if (height > minHeight) {
                            modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                            modalBoxElem.style.top = `${offsetTop - dragTop}px`
                        }
                    }
                    break
                case 'selb':
                    dragLeft = evnt.clientX - disX
                    dragTop = evnt.clientY - disY
                    width = dragLeft + clientWidth
                    height = dragTop + clientHeight
                    if (offsetLeft + width + marginSize < visibleWidth) {
                        if (width > minWidth) {
                            modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                        }
                    }
                    if (offsetTop + height + marginSize < visibleHeight) {
                        if (height > minHeight) {
                            modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                        }
                    }
                    break
                case 'sb':
                    dragTop = evnt.clientY - disY
                    height = dragTop + clientHeight
                    if (offsetTop + height + marginSize < visibleHeight) {
                        if (height > minHeight) {
                            modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                        }
                    }
                    break
                }
                modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + ' is--drag'
                if (remember && storage) {
                    this.savePosStorage()
                }
                if ($listeners.zoom) {
                    this.$emit('zoom', params)
                } else if (events.zoom) {
                    events.zoom.call(this, params)
                }
            }
            document.onmouseup = () => {
                this.zoomLocat = null
                document.onmousemove = domMousemove
                document.onmouseup = domMouseup
                setTimeout(() => {
                    modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '')
                }, 50)
            }
        }
    }
}
