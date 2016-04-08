//  
function ArrayList(){
    var items = [];

    this.insert = function(ele){
    	items.push(ele);
    }

    this.toString = function(){
    	return items.join();
    }

    // 冒泡排序 : 比较任何相邻的两个，如果第一个大于第二个，则交换他们。 性能较差
    this.bubbleSort = function(){
        var length = items.length;
        for(var i=0; i<length; i++){
            for(var j=0; j<length-1-i; j++){
                if(items[j]>items[j+1]){
                    swap(j,j+1);
                }
            }
        }
    }

    // 选择排序 ：找到数据结构中最小的值，并将其放在第一位，接着找到第二小的值放到第二位，以此类推
    this.selectionSort = function(){
        var length = items.length,
        indexMin,j;
        for(var i=0; i<length; i++){
            indexMin = i;
            for(j=i+1; j<length; j++){
                if(items[indexMin]>items[j]){
                    indexMin = j
                }
            }
            if(i!=indexMin){
                swap(i,indexMin)
            }

        }
    }
    var swap = function(index1,index2){
    	var aux = items[index1];
    	items[index1] = items[index2];
    	items[index2] = aux;
    }
    
    // 插入排序：第二项与第一项比较，看是否在原位置还是插到第一项的前面，第三项与第二项和一项比较，根据大小看插入到哪个位置， 以此类推。 性能好于冒泡和选择排序
    this.insertSort = function(){
        var temp,j,
        length = items.length;
        for(var i=1; i<length; i++){
            j=i;
            temp = items[i];
            while(j>0 && items[j-1]>temp){
                items[j] = items[j-1];
                j--;
            }
            items[j] = temp;
        }
        /*for(var i=1; i<length; i++){
            for(j=i-1; j>=0; j--){
                if(items[j]>items[j+1]){
                    swap(j,j+1);
                }
            }
        }*/
    }

    
    // 归并排序：将原始数组切分成小的数组，直到只有一个项的数组，然后通过比较，将小数组归并到较大的数组中，直到一个排序完成的大数组。性能好于前三种，实际应用中比较多
    this.mergeSort = function(){
        items = mergeSortRec(items);
    }

    var mergeSortRec = function(items){
        var length = items.length;
        if(length==1){
            return items
        }
        var mid = Math.floor(length/2);
        var left = items.slice(0,mid);
        var right = items.slice(mid,length);
        return merge(mergeSortRec(left),mergeSortRec(right));
    }

    /*var merge = function(left,right){
        var result = [], il=0, ir=0;
        while(il<left.length && ir<right.length){
            if(left[il]<right[ir]){
                result.push(left[il++]);
            }else{
                result.push(right[ir++])
            }
        }
        while(il<left.length){
            result.push(left[il++])
        }
        while(ir<right.length){
            result.push(right[ir++])
        }
        return result;
    }*/
    
    var merge = function(left,right){
        var result = [];
        while(left.length>0 && right.length>0){
            if(left[0]<right[0]){
                result.push(left.shift())
            }else{
                result.push(right.shift())
            }
        }
        return result.concat(left,right);

    }
    // 快速排序：
    this.quickSort = function(){
        quick(items,0,items.length-1)
    }
    
    var quick = function(array,left,right){
        var index;

        index = partition(array,left,right);
        if(left<index-1){
            quick(array,left,index-1)
        }
        if(index<right){
            quick(array,index,right)
        }
    }

    var partition = function(array,left,right){
        var pivot = array[Math.floor((left+right)/2)],
        i = left,
        j = right;
        while(i<=j){
            while(array[i]<pivot){
                i++;
            }
            while(array[j]>pivot){
                j--
            }
            if(i<=j){
                swapQuickSort(array,i,j)
                i++;
                j--;
            }
        }
        return i;
    }

    var swapQuickSort = function(array,index1,index2){
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }

}





function createNonSortedArray(size){
	var array = new ArrayList();
	for(var i=size; i>0; i--){
		array.insert(i);
	}
	return array
}

var array = createNonSortedArray(5);
console.log(array.toString())
array.insertSort()
console.log(array.toString())




