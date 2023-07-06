type PropsType = {
  children: JSX.Element | JSX.Element[] | string,
  complete: boolean,
  onClick: Function,
  id: string
}

const Card = ({children, complete, onClick, id}: PropsType) => {
return (
  <div onClick={() => onClick(id)} className={`${complete ? 'bg-secondary text-secondary-content' : 'bg-neutral text-neutral-content'} card my-2 bg-neutral`}>
    <div className="card-body items-center text-center">
      <p>{children}</p>
    </div>
  </div>
)
}

export default Card