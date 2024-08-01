import './home.css';
import Card from '../../components/card/Card';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../../utils/ingredientRequests';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import { Ingredient } from '../../utils/type';
import { useEffect } from 'react';

const Home: React.FC = () => {
    const { data, refetch, error, isLoading } = useQuery<Ingredient[], Error>({
        queryKey: ['ingredients'],
        queryFn: getAll
    });

    useEffect(() => {
        refetch();
    }, [window.location.pathname]);

    if (isLoading) return <Loading />;

    if (error) {
        toast.error(error.message);
        return <div>Error loading ingredients</div>;
    }

    return (
        <div className='home'>
            {data && data.map((ingredient: Ingredient) => (
                <Card key={ingredient.id} data={ingredient} />
            ))}
        </div>
    );
};

export default Home;
