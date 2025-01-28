export const Constants ={
    LOCAL_DIALOGPOSITION:"local-dialogposition",
}

export const genUUID = () => (
    [1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11
).replace(/[018]/g, (c) =>
    (parseInt(c, 10) ^ (window.crypto.getRandomValues(new Uint32Array(1))[0] & (15 >> (parseInt(c, 10) / 4)))).toString(16)
);

export const isNotCtrl = (event) => {
    if (!event.metaKey && !event.ctrlKey) {
        return true;
    }
    return false;
};

export class ThemeDialog {
    constructor(options) {
        this.disableClose = options.disableClose;
        this.id = genUUID();
        window.siyuan.dialogs.push(this);
        this.destroyCallback = options.destroyCallback;
        this.element = document.createElement("div");
        let left;
        let top;
        
        if (!window.isMobile() && options.positionId) {
            const dialogPosition = window.siyuan.storage[Constants.LOCAL_DIALOGPOSITION][options.positionId];
            if (dialogPosition) {
                if (dialogPosition.left + dialogPosition.width + 34 <= window.innerWidth &&
                    dialogPosition.top + dialogPosition.height <= window.innerHeight) {
                    left = dialogPosition.left + "px";
                    top = dialogPosition.top + "px";
                    options.width = dialogPosition.width + "px";
                    options.height = dialogPosition.height + "px";
                }
            }
        }

        this.element.innerHTML = `<div class="b3-dialog" style="z-index: ${++window.siyuan.zIndex};${typeof left === "string" ? "display:block" : ""}">
<div class="b3-dialog__scrim"${options.transparent ? 'style="background-color:transparent"' : ""}></div>
<div class="b3-dialog__container ${options.containerClassName}" style="width:${options.width || "auto"};height:${options.height || "auto"};left:${left};top:${top}">
  <svg ${(window.isMobile() && options.title) ? 'style="top:0;right:0;"' : ""} class="b3-dialog__close${(this.disableClose || options.hideCloseIcon) ? " fn__none" : ""}"><use xlink:href="#iconCloseRound"></use></svg>
  <div class="resize__move b3-dialog__header${options.title ? "" : " fn__none"}" onselectstart="return false;">${options.title || ""}</div>
  <div class="b3-dialog__body">${options.content}</div>
  <div class="resize__rd"></div><div class="resize__ld"></div><div class="resize__lt"></div><div class="resize__rt"></div><div class="resize__r"></div><div class="resize__d"></div><div class="resize__t"></div><div class="resize__l"></div>
</div></div>`;

        this.element.querySelector(".b3-dialog__scrim").addEventListener("click", (event) => {
            if (!this.disableClose) {
                this.destroy();
            }
            event.preventDefault();
            event.stopPropagation();
        });

        if (!this.disableClose) {
            this.element.querySelector(".b3-dialog__close").addEventListener("click", (event) => {
                this.destroy();
                event.preventDefault();
                event.stopPropagation();
            });
        }

        document.body.append(this.element);

        if (options.disableAnimation) {
            this.element.classList.add("b3-dialog--open");
        } else {
            setTimeout(() => {
                this.element.classList.add("b3-dialog--open");
            });
        }

        // #if !MOBILE
       // moveResize(this.element.querySelector(".b3-dialog__container"), options.resizeCallback);
        // #endif
    }

    destroy(options) {
        if ((this.element.querySelector(".b3-dialog")).style.zIndex < window.siyuan.menus.menu.element.style.zIndex) {
            window.siyuan.menus.menu.remove();
        }
        this.element.remove();
        if (this.destroyCallback) {
            this.destroyCallback(options);
        }
        window.siyuan.dialogs.find((item, index) => {
            if (item.id === this.id) {
                window.siyuan.dialogs.splice(index, 1);
                return true;
            }
        });
        document.getElementById("drag")?.classList.remove("fn__hidden");
    }

    bindInput(inputElement, enterEvent, bindEnter = true) {
        inputElement.focus();
        inputElement.addEventListener("keydown", (event) => {
            if (event.isComposing) {
                event.preventDefault();
                return;
            }
            if (event.key === "Escape") {
                this.destroy();
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (!event.shiftKey && isNotCtrl(event) && event.key === "Enter" && enterEvent && bindEnter) {
                enterEvent();
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }
}
