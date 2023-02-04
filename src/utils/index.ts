/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-11-23 10:15:04
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-04 00:20:46
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

/**
 * @description: 生成uuid
 * @return {string}
 */
export const createUuId = () => {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}
