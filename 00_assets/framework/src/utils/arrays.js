export function withoutNulls(arr) {
    return arr.filter(item => item != null)
}

export function mapTextNodes(children) {
    return children.map((child) =>
        typeof child === 'string' ? hString(child) : child
    )
}
