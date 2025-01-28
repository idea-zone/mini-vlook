
//#region 


function getSelectedNodes(range, selection) {
    const results = [];
  
    // 获取选区范围
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    const endContainer = range.endContainer;
    const endOffset = range.endOffset;
  
    // 处理选区中包含的元素
    const walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );
  
    let currentNode;
    let inSelection = false;
  
    // 遍历选区内的节点
    while ((currentNode = walker.nextNode())) {
      const parentElement = currentNode.parentElement;
  
      // 获取父元素的属性（如果有的话）
      const dataType = parentElement?.getAttribute('data-type') || null;
      const styles = parentElement?.getAttribute('style') || null;
  
      // 当前节点是文本节点
      if (currentNode.nodeType === Node.TEXT_NODE) {
        if (currentNode === startContainer && currentNode === endContainer) {
          // 起点和终点是同一文本节点
          splitAndPushNode(results, parentElement, currentNode, startOffset, endOffset, dataType, styles);
        } else if (currentNode === startContainer) {
          // 起点节点
          splitAndPushNode(results, parentElement, currentNode, startOffset, currentNode.textContent.length, dataType, styles);
        } else if (currentNode === endContainer) {
          // 终点节点
          splitAndPushNode(results, parentElement, currentNode, 0, endOffset, dataType, styles);
        } else {
          // 中间节点完全被选中
          results.push({
            'data-type': dataType,
            styles,
            text: currentNode.textContent,
            selected: true,
          });
        }
      }
      // 当前节点是元素节点
      else if (currentNode.nodeType === Node.ELEMENT_NODE) {
        // 元素节点内部有文本并且在选区内
        if (range.intersectsNode(currentNode)) {
          const childNodes = Array.from(currentNode.childNodes);
          childNodes.forEach(childNode => {
            if (childNode.nodeType === Node.TEXT_NODE) {
              const childDataType = currentNode.getAttribute('data-type') || null;
              const childStyles = currentNode.getAttribute('style') || null;
              results.push({
                'data-type': childDataType,
                styles: childStyles,
                text: childNode.textContent,
                selected: selection.containsNode(childNode, true),
              });
            }
          });
        }
      }
    }
  
    return results;
  }
  
  function splitAndPushNode(results, parentElement, node, start, end, dataType, styles) {
    const text = node.textContent;
    const before = text.slice(0, start);
    const selected = text.slice(start, end);
    const after = text.slice(end);
  
    // 如果存在未选中的前部分
    if (before) {
      results.push({
        'data-type': dataType,
        styles: styles,
        text: before,
        selected: false,
      });
    }
  
    // 如果选中了部分文本
    if (selected) {
      results.push({
        'data-type': dataType,
        styles: styles,
        text: selected,
        selected: true,
      });
    }
  
    // 如果存在未选中的后部分
    if (after) {
      results.push({
        'data-type': dataType,
        styles: styles,
        text: after,
        selected: false,
      });
    }
  }
  
  
  
  
  
  
  
  
  // function getSelectedNodes(range, selection) {
  //   const results = [];
  
  //   // 获取选区范围
  //   const startContainer = range.startContainer;
  //   const startOffset = range.startOffset;
  //   const endContainer = range.endContainer;
  //   const endOffset = range.endOffset;
  
  //   // 处理选区中包含的元素
  //   const walker = document.createTreeWalker(
  //     range.commonAncestorContainer,
  //     NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
  //     {
  //       acceptNode: (node) => {
  //         return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  //       }
  //     }
  //   );
  
  //   let currentNode;
  //   let inSelection = false;
  
  //   while ((currentNode = walker.nextNode())) {
  //     const parentElement = currentNode.parentElement;
  
  //     // 获取父元素的属性（如果有的话）
  //     const dataType = parentElement?.getAttribute('data-type') || null;
  //     const styles = parentElement?.getAttribute('style') || null;
  
  //     // 当前节点是文本节点
  //     if (currentNode.nodeType === Node.TEXT_NODE) {
  //       if (currentNode === startContainer && currentNode === endContainer) {
  //         // 起点和终点是同一文本节点
  //         splitAndPushNode(results, parentElement, currentNode, startOffset, endOffset, dataType, styles);
  //       } else if (currentNode === startContainer) {
  //         // 起点节点
  //         splitAndPushNode(results, parentElement, currentNode, startOffset, currentNode.textContent.length, dataType, styles);
  //       } else if (currentNode === endContainer) {
  //         // 终点节点
  //         splitAndPushNode(results, parentElement, currentNode, 0, endOffset, dataType, styles);
  //       } else {
  //         // 中间节点完全被选中
  //         results.push({
  //           'data-type': dataType,
  //           styles,
  //           text: currentNode.textContent,
  //           selected: true,
  //         });
  //       }
  //     }
  //     // 当前节点是元素节点
  //     else if (currentNode.nodeType === Node.ELEMENT_NODE) {
  //       // 元素节点内部有文本并且在选区内
  //       if (range.intersectsNode(currentNode)) {
  //         const childNodes = Array.from(currentNode.childNodes);
  //         childNodes.forEach(childNode => {
  //           if (childNode.nodeType === Node.TEXT_NODE) {
  //             const childDataType = currentNode.getAttribute('data-type') || null;
  //             const childStyles = currentNode.getAttribute('style') || null;
  //             results.push({
  //               'data-type': childDataType,
  //               styles: childStyles,
  //               text: childNode.textContent,
  //               selected: selection.containsNode(childNode, true),
  //             });
  //           }
  //         });
  //       }
  //     }
  //   }
  
  //   return results;
  // }
  
  // function splitAndPushNode(results, parentElement, node, start, end, dataType, styles) {
  //   const text = node.textContent;
  //   const before = text.slice(0, start);
  //   const selected = text.slice(start, end);
  //   const after = text.slice(end);
  
  //   // 如果存在未选中的前部分
  //   if (before) {
  //     results.push({
  //       'data-type': dataType,
  //       styles: styles,
  //       text: before,
  //       selected: false,
  //     });
  //   }
  
  //   // 如果选中了部分文本
  //   if (selected) {
  //     results.push({
  //       'data-type': dataType,
  //       styles: styles,
  //       text: selected,
  //       selected: true,
  //     });
  //   }
  
  //   // 如果存在未选中的后部分
  //   if (after) {
  //     results.push({
  //       'data-type': dataType,
  //       styles: styles,
  //       text: after,
  //       selected: false,
  //     });
  //   }
  // }
  
  
  
  
  
  
  
  // function getSelectedTextInfo() {
  //   let result = [];
  //   let selection = window.getSelection();
  //   if (selection.rangeCount > 0) {
  //       let range = selection.getRangeAt(0);
  //       let parentDiv = range.commonAncestorContainer.parentNode;
  
  //       // Create a new Range object to manipulate
  //       let newRange = document.createRange();
  
  //       let childNodes = parentDiv.childNodes;
  //       for (let i = 0; i < childNodes.length; i++) {
  //           let node = childNodes[i];
  //           newRange.selectNodeContents(node);
  //           if (newRange.compareBoundaryPoints(Range.END_TO_START, range) < 1 && 
  //               newRange.compareBoundaryPoints(Range.START_TO_END, range) > -1) {
  //               // the current node is in the selection range
  //               let selectedText = (node.nodeType === 3) ? node.textContent : node.textContent.slice(range.startOffset, range.endOffset);
  //               let unselectedText = (node.nodeType === 3) ? "" : node.textContent.replace(selectedText, '');
  //               result.push({
  //                   "data-type": (node.nodeType === 3) ? null : node.getAttribute('data-type'),
  //                   "styles": (node.nodeType === 3) ? null : node.getAttribute('style'),
  //                   "text": selectedText,
  //                   "selected": true
  //               });
  //               if (unselectedText.trim() !== '') {
  //                   result.push({
  //                       "data-type": (node.nodeType === 3) ? null : node.getAttribute('data-type'),
  //                       "styles": (node.nodeType === 3) ? null : node.getAttribute('style'),
  //                       "text": unselectedText,
  //                       "selected": false
  //                   });
  //               }
  //           }
  //       }
  //   }
  //   return result;
  // }
  
  
  
  
  /**dddddddd */
  
  
  // function getSelectedNodes(range, startContainer, startOffset, endContainer, endOffset,selectedText) {
  //   const results = [];
  
  //   // 特殊情况：仅选中一个完整的元素
  //   console.warn("10");
  //   console.log(startContainer.nodeType);
  //   console.log( Node.ELEMENT_NODE);
  //   if (startContainer === endContainer && startContainer.nodeType === Node.ELEMENT_NODE) {
  //     console.warn("11");
  //     results.push(getNodeInfo(startContainer, true));
  //     return results;
  //   }
  
  //   console.warn("22");
  
  //   // 遍历选区范围内的所有文本节点
  //   const walker = document.createTreeWalker(
  //     range.commonAncestorContainer,
  //     NodeFilter.SHOW_TEXT,
  //     {
  //       acceptNode: (node) => {
  //         return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  //       },
  //     }
  //   );
  
  //   let currentNode;
  //   while ((currentNode = walker.nextNode())) {
  //     const parentElement = currentNode.parentElement;
  
  //     // 获取父节点的属性（如果存在），否则设置默认值
  //     const dataType = parentElement?.getAttribute('data-type') || null;
  //     const styles = parentElement?.getAttribute('style') || null;
  //     console.log(parentElement);
  //     console.log(dataType);
  //     console.log(parentElement.textContent);
  //     console.warn("112");
  
  //     if (currentNode === startContainer && currentNode === endContainer) {
  //       // 起点和终点是同一个文本节点
  //       splitAndPushNode(results, parentElement, currentNode, startOffset, endOffset, dataType, styles);
  //     } else if (currentNode === startContainer) {
  //       // 起点节点
  //       splitAndPushNode(results, parentElement, currentNode, startOffset, currentNode.textContent.length, dataType, styles);
  //     } else if (currentNode === endContainer) {
  //       // 终点节点
  //       splitAndPushNode(results, parentElement, currentNode, 0, endOffset, dataType, styles);
  //     } else {
  //       // 完全选中的中间节点
  //       results.push({
  //         'data-type': dataType,
  //         styles,
  //         text: currentNode.textContent,
  //         selected: true,
  //       });
  //     }
  //   }
  
  //   // 特殊情况：如果没有遍历到任何文本节点，但选中的是普通文本或元素
  //   if (results.length === 0 || results.length === 1) {
  //     const singleTextNode = startContainer.nodeType === Node.TEXT_NODE ? startContainer : null;
  //     console.warn("113");
  //     console.warn(singleTextNode);
  //     if (singleTextNode) {
  //       const parentElement = singleTextNode.parentElement;
  //       results.push({
  //         'data-type': parentElement?.getAttribute('data-type') || null,
  //         styles: parentElement?.getAttribute('style') || null,
  //         text: singleTextNode.textContent,
  //         selected: true,
  //       });
  //     }
  //   }
  
  //   return results;
  // }
  
  // function splitAndPushNode(results, parentElement, node, start, end, dataType, styles) {
  //   const text = node.textContent;
  //   const before = text.slice(0, start);
  //   const selected = text.slice(start, end);
  //   const after = text.slice(end);
  
  //   // 默认值处理：对于没有父元素的文本节点
  //   const defaultDataType = null;
  //   const defaultStyles = null;
  
  //   // 如果没有父元素，使用默认值
  //   const effectiveDataType = parentElement ? dataType : defaultDataType;
  //   const effectiveStyles = parentElement ? styles : defaultStyles;
  
  //   // 如果存在未选中的前部分
  //   if (before) {
  //     results.push({
  //       'data-type': effectiveDataType,
  //       styles: effectiveStyles,
  //       text: before,
  //       selected: false,
  //     });
  //   }
  
  //   // 如果选中了部分文本
  //   if (selected) {
  //     results.push({
  //       'data-type': effectiveDataType,
  //       styles: effectiveStyles,
  //       text: selected,
  //       selected: true,
  //     });
  //   }
  
  //   // 如果存在未选中的后部分
  //   if (after) {
  //     results.push({
  //       'data-type': effectiveDataType,
  //       styles: effectiveStyles,
  //       text: after,
  //       selected: false,
  //     });
  //   }
  // }
  
  // function getNodeInfo(node, isSelected) {
  //   const dataType = node.getAttribute('data-type') || null;
  //   const styles = node.getAttribute('style') || null;
  
  //   return {
  //     'data-type': dataType,
  //     styles,
  //     text: node.textContent,
  //     selected: isSelected,
  //   };
  // }
  
  
  
  //#endregion
  
  