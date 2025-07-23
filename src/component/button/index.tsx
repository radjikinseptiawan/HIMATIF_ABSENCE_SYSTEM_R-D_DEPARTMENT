/* eslint-disable @next/next/no-img-element */
export default function Button(
  {variant, text,action,media,type,disabled} : {disabled: boolean,type:"submit"|"button",action : ()=>void,variant : string, text:string,media:string}
){
  return(
    <>
    <button className={variant} type={type} disabled={disabled}  onClick={action}>
      {
        media && media.length > 0 &&
      <img src={media} width={30} alt="" />
      }
      {text}</button>
    </>           
  )
}