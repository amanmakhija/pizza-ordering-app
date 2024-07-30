import './loading.css'

const Loading: React.FC = () => {
    return (
        <div className='loading'>
            <div className='loading-container'>
                <div className='loading-spinner'></div>
                <h1>Loading...</h1>
            </div>
        </div>
    )
}

export default Loading