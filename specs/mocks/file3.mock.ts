export const file3Mock = `---
title: Linear search
tags: ["search", "algorithms", "binary"]
languages: ["typescript", "java", "python"]
sort: 600
---

# Linear search

Linear Search, also known as sequential search, is a simple searching algorithm that finds the position of a target value within a list or array. It works by iterating through the elements one by one until the target value is found or the entire list has been searched.

## How Linear Search Works:

**Step1 :** Looking at the first element in the list.

**Step 2:** Compare with Target

**Step 3:** If the current element is equal to the target value, the search is successful, and the index or position of the element is returned, if not continue by moving to the next element in the list.

## Key Characteristics:

**Sequential Nature**: Linear search sequentially checks each element in the list or array until the target element is found or until the end of the list is reached.

**Unordered List Search**: The algorithm is effective for searching elements in unordered lists, as it does not rely on any specific ordering of elements.

**No Pre-processing Required**: Unlike some other search algorithms like binary search, linear search does not require the list to be sorted beforehand.

**Suitable for Small Lists**: Linear search can be suitable for small lists or arrays where the overhead of sorting the list or using more complex algorithms is unnecessary.

**Applicability**: It can be used in various scenarios, such as searching for an item in a database, finding a specific record in a file, or locating a value in an unsorted array.

**Ease of Implementation**: Linear search is straightforward to implement, making it a good choice for introductory programming exercises and situations where simplicity is preferred over performance.

**Search Completeness**: This algorithm guarantees that if the element exists in the list, it will eventually be found after traversing through the entire list.

**No Auxiliary Space Required**: Linear search typically does not require any additional memory beyond what is already allocated for the list itself.

**Suboptimal for Large Lists**: While this algorithm is efficient for small lists, its linear time complexity makes it suboptimal for large lists, especially compared to more efficient search algorithms like binary search on sorted lists.

## Applications:

**Database Management Systems**: In database systems, linear search can be used to search for records based on certain criteria when there's no specific indexing available or when the data is not ordered in any particular way.

**Finding an Item in a List**: Linear search is commonly used in programming scenarios to find an element within a list or array. This can be applicable in tasks such as searching for a specific value in a list of student grades, employee IDs, or product codes.

**Searching Files**: The algorithm can be used in applications that involve searching for a particular record or line within a file. For instance, searching for a specific keyword in a text file or finding a particular entry in a log file.

**User Interface Development**: In user interfaces, the algorithm can be used to locate elements within a list or menu. For example, searching for an item in a dropdown menu or a list of options presented to the user.

**Unsorted Data**: When the data is not sorted or when sorting the data beforehand is not feasible due to time or resource constraints, linear search becomes the go-to method for searching.

**Debugging**: Linear search can be utilized during debugging sessions to search through an array or data structure to locate specific values or objects that are causing issues.

**Educational Purposes**: Linear search serves as a fundamental concept in computer science education, providing a simple example of a search algorithm that helps students understand the concept of searching and algorithms in general.

**Small Datasets**: The algorithm is suitable for scenarios where the dataset is small or the performance overhead of more complex algorithms is unnecessary.

**Backup Systems**: Linear search can be used in backup systems to locate and retrieve specific files or pieces of data from a backup storage when needed.

## Time Complexity:
The time complexity of Linear Search is O(n), where 'n' is the number of elements in the array. In the worst case, the algorithm may need to iterate through the entire list to find the target value. While Linear Search is simple, it may not be the most efficient for large datasets, especially when compared to more advanced search algorithms like binary search on sorted lists. However, it is easy to understand and implement.

![Linear search](https://raw.githubusercontent.com/AndersDeath/holy-theory/main/images/linear-search.png)

## Example

\`\`\`typescript
function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}
\`\`\`
`;