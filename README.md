# React Pagination
Paginates an array of data then passes it, through props, to a component which you will kindly provide via render prop.

> This package is my first ever package! ✨ ✨ ✨ ✨
> It is also in very early stages of development, so if you have any feedback, please don't hesitate to contact me

## Installation
#### npm
```sh
npm i dsimms-react-pagination
```
#### index.js
Wrap your `<App />` with `<PaginationProvider>` as `React.Context` is used under the hood.
```jsx
import { PaginationProvider } from "dsimms-react-pagination";
```
```jsx
<PaginationProvider>
  <App />
</PaginationProvider>
```

#### YourComponent.js
You need to provide a component as a render prop so the pagination can work it's magic, making sure to pass in `data={data}`.
```jsx
import Pagination from "dsimms-react-pagination";
```
```jsx
export YourComponent = () => {
    return (
        <Pagination
          data={dataToBePaginated}
          itemsPerPage={12}
          pageLinksAmount={5}
          currentPage={1}
          render={(data) => <YourOtherComponent data={data} />}
        />
    )
}
```

## Props
| Prop | Type (Required) |
| ------ | ------ |
| data | Array  |
| itemsPerPage | Int |
| pageLinksAmount | Int |
| currentPage | Int |
| render | Function: Component |
