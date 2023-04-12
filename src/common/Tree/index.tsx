import { Tree as AntdTree, TreeProps } from 'antd'

export const Tree = (props: TreeProps) => {
    return <AntdTree {...props} />
}

export const DirectoryTree = AntdTree.DirectoryTree