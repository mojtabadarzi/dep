import React from 'react'
import { NavLink } from 'react-router-dom'

//icons
import { CurlyUp, CurlyDown, ArrowDownWhite, ArrowUpWhite } from 'src/utils/Icons'

function SideItem(props) {
  const {
    activeClassName,
    icon,
    activeIcon,
    routName,
    title,
    click,
    showIcon = true,
    showArrow = false,
    arrowUp,
  } = props
  return (
    <>
      {showArrow ? (
        <div
          className="flex items-center mb-1 py-1 px-2 relative cursor-pointer menu-hover-7 sidebar-item"
          onClick={click}
        >
          {showIcon ? (
            <>
              <img className="w-4 navLinkIcon-1" src={icon} alt={title} />
              <img className="w-4 navLinkIcon-2" src={activeIcon} alt={title} />
            </>
          ) : (
            ''
          )}
          <span style={{ color: '#fff' }} className="text-sm mr-4 font-yekanlight navLinkText-1">
            {title}
          </span>
          <span style={{ color: '#1641ff' }} className="text-sm mr-4 font-yekanlight navLinkText-2">
            {title}
          </span>

          <span className="top-curly-parent">
            {/* <span className="top-curly-child"></span> */}
            <img className="top-curly-child" src={CurlyUp} alt="آیکن" />
          </span>
          <span className="bottom-curly-parent">
            {/* <span className="bottom-curly-child"></span> */}
            <img className="top-curly-child" src={CurlyDown} alt="آیکن" />
          </span>
          {arrowUp ? (
            <img className="w-2 absolute left-0 ml-8" src={ArrowUpWhite} alt="باز" />
          ) : (
            <img className="w-2 absolute left-0 ml-8" src={ArrowDownWhite} alt="بسته" />
          )}
        </div>
      ) : (
        <NavLink
          to={routName}
          className="flex items-center mb-1 px-2 py-1 relative menu-hover-7 sidebar-item"
          activeClassName={activeClassName}
          onClick={click}
        >
          {showIcon ? (
            <>
              <img className="w-4 navLinkIcon-1" src={icon} alt={title} />
              <img className="w-4 navLinkIcon-2" src={activeIcon} alt={title} />
            </>
          ) : (
            ''
          )}
          <span style={{ color: '#fff' }} className="text-sm mr-4 font-yekanlight navLinkText-1">
            {title}
          </span>
          <span style={{ color: '#1641ff' }} className="text-sm mr-4 font-yekanlight navLinkText-2">
            {title}
          </span>

          <span className="top-curly-parent">
            {/* <span className="top-curly-child"></span> */}
            <img className="top-curly-child" src={CurlyUp} alt="آیکن" />
          </span>
          <span className="bottom-curly-parent">
            {/* <span className="bottom-curly-child"></span> */}
            <img className="top-curly-child" src={CurlyDown} alt="آیکن" />
          </span>

          {showArrow ? (
            <>
              {arrowUp ? (
                <img className="w-2 absolute left-0 ml-8" src={ArrowUpWhite} alt="باز" />
              ) : (
                <img className="w-2 absolute left-0 ml-8" src={ArrowDownWhite} alt="بسته" />
              )}
            </>
          ) : (
            ''
          )}
        </NavLink>
      )}
    </>
  )
}
export default SideItem
