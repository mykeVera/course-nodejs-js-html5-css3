const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mikeveraq_db_user:iwMaJ25BwpEe8vYl@cluster0.h0fg1o3.mongodb.net/?appName=Cluster0');

const User = mongoose.model('User', {
    username: String,
    edad: Number,
});

const crear = async () => {
    const user = new User({ username: 'Mike Erick', edad: 25 });
    const savedUser = await user.save();
    console.log('Usuario creado:', savedUser);
}
// crear();

const buscarTodos = async () => {
    const users = await User.find();
    console.log('Usuarios encontrados:', users);
}
// buscarTodos();

const buscar = async (username) => {
    const user = await User.find({ username: { $regex: username, $options: 'i' } }); // $regex permite buscar patrones, y $options: 'i' hace que la búsqueda sea case-insensitive (ignora mayúsculas/minúsculas)
    console.log('Usuario(s) encontrado(s):', user);
}
// buscar('Erick');

const buscarUno = async (username) => {
    const user = await User.findOne({ username });
    console.log('Usuario encontrado:', user);
}
// buscarUno('Mike Erick');

const actualizar = async (username, nuevaEdad) => {
    const user = await User.findOne({ username });
    user.edad = nuevaEdad;
    const updatedUser = await user.save();
    console.log('Usuario actualizado:', updatedUser);
}
// actualizar('Mike Erick', 31);

const eliminar = async (username) => {
    const user = await User.findOne({username});
    if(user) await user.deleteOne();
    console.log('Usuario eliminado:', user);
}
// eliminar('Erick');