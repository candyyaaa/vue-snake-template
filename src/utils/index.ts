/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-11-23 10:15:04
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-11-23 10:18:47
 */
export const treeToArray = (tree: any) => {
  return tree.reduce((res: any, item: any) => {
    const { children, ...i } = item
    return res.concat(
      i,
      children && children.length ? treeToArray(children) : []
    )
  }, [])
}
