const BookModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Book",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            excerpt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            page_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            summary: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
export { BookModel };
