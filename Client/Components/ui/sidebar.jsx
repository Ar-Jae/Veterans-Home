import React from 'react'

export const Sidebar = ({ children, className = '' }) => (
  <aside className={className}>{children}</aside>
)

export const SidebarContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

export const SidebarGroup = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

export const SidebarGroupContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

export const SidebarGroupLabel = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

export const SidebarMenu = ({ children, className = '' }) => (
  <ul className={className}>{children}</ul>
)

export const SidebarMenuItem = ({ children, className = '' }) => (
  <li className={className}>{children}</li>
)

export const SidebarMenuButton = ({ children, asChild, className = '', ...props }) => {
  // For simplicity, ignore asChild behavior and render a div or passed child
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { className: `${children.props.className || ''} ${className}`.trim(), ...props })
  }
  return <div className={className} {...props}>{children}</div>
}

export const SidebarHeader = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

export const SidebarFooter = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

export const SidebarProvider = ({ children }) => <>{children}</>

export const SidebarTrigger = (props) => <button {...props} />

export default Sidebar
