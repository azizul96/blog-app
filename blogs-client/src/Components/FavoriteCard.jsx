


const FavoriteCard = ({blog}) => {
    return (
        <div className="flex overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-1/3 bg-cover" style={{backgroundImage: 'url(/blog.png)'}}></div>

            <div className="w-2/3 p-4 md:p-4">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{blog.title}</h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptate accusamus alias vitae omnis dicta facilis distinctio soluta placeat inventore.</p>

            </div>
        </div>
    );
};

export default FavoriteCard;