import React, { useRef } from 'react'

//const
import { CameraDarkGrey, TrashRed } from 'src/utils/Icons'

const SimpleImageUploader = ({ src = '', change, name, deleteImage, val }) => {
  const select = useRef(null)

  const triggerSelectFile = () => {
    if (select) {
      if (select.current) {
        select.current.click()
      }
    }
  }
  return (
    <div
      className="bg-color1 rounded-lg flex flex-col justify-center items-center cursor-pointer relative overflow-hidden simple-image-uploader-box"
      style={{ width: 270, height: 270 }}
    >
      <input
        type="file"
        accept="image/jpeg, image/png"
        name={name}
        multiple={true}
        onChange={change}
        className="hidden"
        value={val}
        ref={select}
      />
      {!src && (
        <div onClick={triggerSelectFile} className="flex flex-col items-center justify-center">
          <img className="w-8 " src={CameraDarkGrey} alt="دوربین" />
          <span className="text-sm text-color2 mt-2">انتخاب عکس</span>
        </div>
      )}
      {src && (
        <>
          <div
            className="absolute right-0 left-0 flex items-center justify-center w-full h-full image-uploader-trash-box "
            onClick={deleteImage}
          >
            <img className="w-20 mt-2 ml-2 p-2 image-uploader-trash" src={TrashRed} alt="حذف" />
          </div>
          <div
            className="w-full h-full rounded-lg"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={triggerSelectFile}
          ></div>
        </>
      )}
    </div>
  )
}
export default SimpleImageUploader
