import React from 'react'
import InnerContent from 'src/container/InnerContent'
import Button from 'src/components/Button'

function NotFound({ history }) {
  return (
    <InnerContent>
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="text-8xl text-color2 leading-none">404</div>
        <div className="text-2xl text-color2">صفحه مورد نظر یافت نشد !!</div>
        <Button
          title="رفتن به خانه"
          click={() => history.push('/')}
          backgroundColor="#576f8c"
          width="180px"
          text="text-base"
          font="font-yekanregular"
          btnType="button"
          margin="mt-4"
          border="rounded-full"
        />
      </div>
    </InnerContent>
  )
}
export default NotFound
