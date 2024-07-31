import { useNavigate } from "react-router-dom";
import { Order } from "../../utils/type";
import { format, parseISO } from 'date-fns';
import './order.css';

type OrderProps = {
    data: Order['order'];
};

const OrderPage: React.FC<OrderProps> = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div className='order-card' onClick={() => navigate('/orders/' + data.id)}>
            <div className='order-card-details'>
                <p>ID: {data.id}</p>
                <h1>₹ {data.total}</h1>
                <p>Status: <span className={data.status === 'CANCELLED' ? 'cancelled' : ''}>{data.status}</span></p>
            </div>
            <div>
                {data.cancelledAt ? <p>Cancelled at: {format(parseISO(data.cancelledAt), 'PPpp')}</p> : <p>Ordered at: {format(parseISO(data.orderedAt), 'PPpp')}</p>}
            </div>
        </div>
    )
}

export default OrderPage