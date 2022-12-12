export default function Modal(props: any) {
    return (
        <section>
            <input type="checkbox" id={props.modalId} className="modal-toggle"/>
            <div className="modal justify-center items-center text-center">
                <div className="modal-box w-11/12 max-w-5xl">
                    <label htmlFor={props.modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="card w-full max-w-5xl h-[50px] bg-primary text-primary-content mt-5 justify-center">
                        <div className="card-body items-center">
                            <h1 className="card-title text-white text-2xl">{props.title}</h1>
                        </div>
                    </div>
                    <div className="card w-full max-w-5xl h-auto bg-primary text-primary-content mt-5 justify-center">
                        {props.children[0]}
                    </div>
                    <div className="card w-full max-w-5xl h-[50px] bg-primary text-primary-content mt-5 justify-center modal-action">
                        {props.children[1]}
                    </div>
                </div>
            </div>
        </section>
    )
}
