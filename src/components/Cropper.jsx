import React, { useRef } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Button from './Button'
import { CameraDarkGrey, PenEditWhite, TrashRed, Close } from 'src/utils/Icons'
const Cropper = ({
  title,
  sentResultimage,
  name,
  image,
  setImage,
  file,
  selectFile,
  result,
  setResult,
  crop,
  setCrop,
  val,
  setVal,
  deleteImage,
}) => {
  const select = useRef()
  const cropperSide = useRef()

  const triggerSelectFile = () => {
    select.current.click()
  }
  const handleFileChange = (e) => {
    openCropperSide()

    if (e.target) {
      if (e.target.files[0]) {
        const file = URL.createObjectURL(e.target.files[0])
        selectFile(file)
      }
    }
  }

  function getCroppedImg() {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
    const base64Image = canvas.toDataURL('image/jpeg')
    setResult(base64Image)
    sentResultimage(base64Image)
  }
  const closeCropperSide = () => {
    cropperSide.current.className = 'cropper-side-close'
  }
  const openCropperSide = () => {
    cropperSide.current.className = 'cropper-side-open'
  }

  return (
    <div className="flex flex-col" name={name}>
      {title && <span className="text-color2 text-xs font-yekanbold relative mb-2">{title}</span>}
      <div
        className="bg-color1 rounded-lg flex flex-col justify-center items-center cursor-pointer relative"
        style={{ width: 270, height: 270 }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          onChangeCapture={handleFileChange}
          className="hidden"
          ref={select}
          value={val}
        />

        {!result && (
          <div onClick={triggerSelectFile} className="flex flex-col items-center justify-center">
            <img className="w-8 " src={CameraDarkGrey} alt="دوربین" />
            <span className="text-sm text-color2 mt-2">انتخاب عکس</span>
          </div>
        )}
        {result && (
          <>
            <img
              className="w-8 absolute top-0 left-0 hover:opacity-50 mt-2 ml-2 p-2 rounded-lg bg-color2"
              src={PenEditWhite}
              alt="ویرایش"
              onClick={openCropperSide}
            />
            <img
              className="w-8 absolute top-0 left-0 hover:opacity-50 mt-2 ml-12 p-2 rounded-lg bg-white"
              src={TrashRed}
              alt="حذف"
              onClick={deleteImage}
            />
            <img
              className="w-full h-full rounded-lg"
              src={result}
              alt="عکس"
              onClick={triggerSelectFile}
            />
          </>
        )}
      </div>

      <div className="cropper-side-close " ref={cropperSide}>
        {file && (
          <div>
            <img
              className="w-8 absolute top-0 right-0 hover:opacity-50 fixed z-20 cursor-pointer m-3"
              src={Close}
              alt="بستن"
              onClick={closeCropperSide}
            />
            <div style={{ borderBottom: '1px dashed #bdc8d6', paddingBottom: '1rem' }}>
              <ReactCrop src={file} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
              <Button
                title="برش"
                click={getCroppedImg}
                backgroundColor="#576f8c"
                width="100%"
                text="text-base"
                font="font-yekanregular"
                btnType="button"
              />
            </div>
            {result && (
              <div className="mt-4 flex  justify-between items-end">
                <img className="w-1/2 rounded-lg" src={result} alt="عکس برش داده شده" />
                <Button
                  title="ثبت کردن"
                  click={closeCropperSide}
                  backgroundColor="#00dbb5"
                  text="text-base"
                  font="font-yekanregular"
                  width="50%"
                  margin="mr-2"
                  btnType="button"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cropper

/* <Cropper
                title="عکس پروفایل"
                name="avatar"
                sentResultimage={(value) =>
                  handleChangeAgent({ target: { value, name: 'avatar' } })
                }
                image={driverImage}
                setImage={(driverImage) => setDriverImage(driverImage)}
                file={driverFile}
                selectFile={(file) => selectDriverFile(file)}
                result={driverResult}
                setResult={(result) => setDriverResult(result)}
                crop={driverCrop}
                setCrop={setDriverCrop}
                val={driverVal}
                setVal={() => setDriverVal('')}
                deleteImage={deleteImageDriver}
              /> */

// const [driverFile, selectDriverFile] = useState(null)
// const [driverImage, setDriverImage] = useState(null)
// const [driverCrop, setDriverCrop] = useState({ aspect: 1 })
// const [driverResult, setDriverResult] = useState(null)
// const [driverVal, setDriverVal] = useState('')
