function Input(props) {

    return(
        <div>
             < input type={props.type} name={props.name} id={props.name} placeholder={props.place} required />
        </div>
    )
}

export default Input