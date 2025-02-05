import bcrypt from 'bcryptjs';

export const createStudent = async (dbConnection, { fullName, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await dbConnection.execute(
    'INSERT INTO students (fullName, email, password, role) VALUES (?, ?, ?, ?)',
    [fullName, email, hashedPassword, role]
  );
  return result.insertId;
};

export const findStudentByEmail = async (dbConnection, email) => {
  const [rows] = await dbConnection.execute('SELECT * FROM students WHERE email = ?', [email]);
  return rows[0];
};

export const findStudentById = async (dbConnection, id) => {
  const [rows] = await dbConnection.execute('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0];
};