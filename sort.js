/**
 * 依次比较相邻的两个元素
 * 如果后一个小于前一个，则交换
 * 每次遍历把未排序部分最小的元素放到已排序部分的末尾
 */
function bubbleSort(arr) {
    const len = arr.length
    for (let i = 1; i < len; i++) {
        //每次把最小的元素移到末尾，移 (len - 1) 次
        for (let j = len - 1; j >= i; j--) {
            //从后向前冒泡
            if (arr[j - 1] > arr[j]) {
                const temp = arr[j - 1]
                arr[j - 1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

/**
 * 每次遍历把未排序部分最小的元素放到已排序部分的末尾
 */
function selectionSort(arr) {
    const len = arr.length
    let minIndex, temp
    for (let i = 0; i < len - 1; i++) {
        //每次把最小的元素移到前面，移 (len - 1) 次
        minIndex = i
        for (let j = i + 1; j < len; j++) {
            //每次从后 (len - 1 - i) 个元素中找出最小的
            if (arr[j] < arr[minIndex]) minIndex = j
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}

/**
 *  从未排序部分拿出一个元素插到已排序部分
 */
function insertSort(arr) {
    const len = arr.length
    let current, index
    for (let i = 1; i < len; i++) {
        index = i
        current = arr[i]
        while (index > 0 && arr[index - 1] > current) {
            //将已排序部分大于 current 的后移
            arr[index] = arr[index - 1]
            index--
        }
        arr[index] = current
    }
    return arr
}

function mergeSort(arr) {
    return partition(arr)

    function partition(arr) {
        const len = arr.length
        if (len < 2) return arr
        const middleIndex = Math.floor(len / 2),
            left = arr.slice(0, middleIndex),
            right = arr.slice(middleIndex)
        return merge(partition(left), partition(right))
    }
    function merge(left, right) {
        const result = []
        while (left.length > 0 && right.length > 0) {
            if (left[0] < right[0]) result.push(left.shift())
            else result.push(right.shift())
        }

        while (left.length > 0) {
            result.push(left.shift())
        }

        while (right.length > 0) {
            result.push(right.shift())
        }

        return result
    }
}

function quickSort(arr) {
    return partition(arr)
    function partition(arr) {
        if (arr.length < 2) return arr
        // console.log(arr.join(','))
        let i = 0, j = arr.length - 1, k = 0, key = arr[k]
        while (i < j) {
            while (i < j && arr[j] >= key) {
                j--
            }
            arr[k] = arr[j]
            arr[j] = key
            k = j
            while (i < j && arr[i] <= key) {
                i++
            }
            arr[k] = arr[i]
            arr[i] = key
            k = i
        }
        // console.log(arr.slice(0, k), key, arr.slice(k + 1))
        return partition(arr.slice(0, k)).concat([key]).concat(partition(arr.slice(k + 1)))
    }
}

function heapSort(arr) {
    const len = arr.length

    /**
     * 建堆
     * 调整每个子树
     * 最后一个非终端节点序号为 [n / 2] - 1
     */
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(arr, i, len)
    }

    /**
     * 排序
     * 堆顶为堆中最大值
     * 依次将堆顶取出，剩下的部分重新调整为堆
     */
    let temp
    for (let j = len - 1; j > 0; j--) {
        temp = arr[0]
        arr[0] = arr[j]
        arr[j] = temp

        heapify(arr, 0, j)
    }

    return arr

    /**
     * 调整某个子树
     * @param {number[]} arr 
     * @param {number} index 当前处理的子树的根节点序号 
     */
    function heapify(arr, index, len) {
        const leftIndex = 2 * index + 1,
            rightIndex = 2 * index + 2

        // console.log()
        // console.log(arr)
        // console.log(leftIndex, rightIndex, index)
        let largestIndex = index
        if (leftIndex < len && arr[leftIndex] > arr[largestIndex]) {
            largestIndex = leftIndex
        }
        if (rightIndex < len && arr[rightIndex] > arr[largestIndex]) {
            largestIndex = rightIndex
        }

        if (largestIndex !== index) {
            const temp = arr[index]
            arr[index] = arr[largestIndex]
            arr[largestIndex] = temp
            // console.log('swap', arr[index], arr[largestIndex])
            heapify(arr, largestIndex, len)
        }
    }
}

// heapSort([5, 1, 3, 14, 20, 9, 10, 2, 8, 7])

module.exports = {
    bubbleSort,
    selectionSort,
    insertSort,
    mergeSort,
    quickSort,
    heapSort
}