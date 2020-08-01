import React from 'react'
import { withRouter } from 'react-router-dom'

//components
import Button from 'src/components/Button'
import Tabs from '../components/Tabs'
import ExportPdf from './ExportPdf'

function PageTitle(props) {
  const {
    title,
    classname,
    icon,
    buttonTitle,
    downloadBtn,
    btnType,
    disabled,
    loading,
    btnOneClick,
    tabData,
    changeTab,
    activeTabIndex,
    btnIcon,
  } = props
  return (
    <div className={classname}>
      <div className="flex items-center">
        {icon ? (
          <div
            className="p-4 ml-4 flex items-center justify-center border rounded-lg border-gray-400 cursor-pointer"
            style={{ borderRadius: 16 }}
            onClick={() => props.history.goBack()}
          >
            <img className="w-2" src={icon} alt="برگشت" />
          </div>
        ) : (
          ''
        )}
        {title}
      </div>
      {tabData && (
        <div className="p-2 bg-white rounded-xlg">
          <Tabs data={tabData} changeTab={changeTab} activeTabIndex={activeTabIndex} />
        </div>
      )}

      <div className="flex justify-between items-center">
        {buttonTitle && (
          <Button
            icon={btnIcon}
            title={buttonTitle}
            status="primary"
            color="text-white"
            backgroundColor="#1641ff"
            btnType={btnType}
            disabled={disabled}
            loading={loading}
            click={btnOneClick}
            padding="py-3 px-16"
            margin="ml-4"
            height="40px"
          />
        )}
        {downloadBtn && <ExportPdf />}
      </div>
    </div>
  )
}
export default withRouter(PageTitle)
