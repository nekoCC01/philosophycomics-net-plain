
import { DOM_TYPES } from './h.js'
import { setAttributes } from './attributes.js'
import { addEventListeners } from './events.js'
import { removeEventListeners } from './events'

export function mountDOM(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl)
      break
    }

    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl)
      break
    }

    case DOM_TYPES.FRAGMENT: {
      createFragmentNodes(vdom, parentEl)
      break
    }

    default: {
      throw new Error(`Can't mount DOM of type: ${vdom.type}`)
    }
  }
}

function createTextNode(vdom, parentEl) {
  const { value } = vdom

  const textNode = document.createTextNode(value)
  vdom.el = textNode

  parentEl.append(textNode)
}

function createFragmentNodes(vdom, parentEl) {
  const { children } = vdom
  vdom.el = parentEl

  children.forEach((child) => mountDOM(child, parentEl))
}

function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom

  const element = document.createElement(tag)
  addProps(element, props, vdom)
  vdom.el = element

  children.forEach((child) => mountDOM(child, element))
  parentEl.append(element)
}

function addProps(el, props, vdom) {
  const { on: events, ...attrs } = props

  vdom.listeners = addEventListeners(events, el)
  setAttributes(el, attrs)
}

export function destroyDOM(vdom) {
  const { type } = vdom

  switch (type) {
    case DOM_TYPES.TEXT: {
      removeTextNode(vdom)
      break
    }

    case DOM_TYPES.ELEMENT: {
      removeElementNode(vdom)
      break
    }

    case DOM_TYPES.FRAGMENT: {
      removeFragmentNodes(vdom)
      break
    }

    default: {
      throw new Error(`Can't destroy DOM of type: ${type}`)
    }
  }

  delete vdom.el
}

function removeTextNode(vdom) {
  const { el } = vdom
  el.remove()
}

function removeElementNode(vdom) {
  const { el, children, listeners } = vdom

  el.remove()
  children.forEach(destroyDOM)

  if (listeners) {
    removeEventListeners(listeners, el)
    delete vdom.listeners
  }
}

function removeFragmentNodes(vdom) {
  const { children } = vdom
  children.forEach(destroyDOM)
}