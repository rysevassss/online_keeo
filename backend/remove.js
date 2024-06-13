const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('online_keeo', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const removeColumn = async () => {
  try {
    await sequelize.query("ALTER TABLE orders DROP COLUMN address;");
    console.log('Колонка успешно удалена');
  } catch (error) {
    console.error('Ошибка удаления колонки:', error);
  }
}

removeColumn();