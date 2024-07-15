const user = require('../models/userModel');

const FavoriteContentID = async (req, res) => {
    const { userId, itemId, type, image } = req.body;
    console.log(itemId)

    try {
        const findUser = await user.User.findOne({ _id: userId });

        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const filmIndex = findUser.favoriteList.some(item => item.favoriteId === itemId && item.type === type);

        if (filmIndex) {
            await user.User.findByIdAndUpdate(
                userId,
                { $pull: { favoriteList: { favoriteId: itemId } } }
            ); 
            console.log("Elemento rimosso dalla lista dei preferiti");
            res.status(200).json({ message: 'Elemento rimosso dalla lista dei preferiti'});
        } else {
            await user.User.findByIdAndUpdate(
                userId,
                { $addToSet: { favoriteList: { favoriteId: itemId, type: type, img: image } } }
            );
            console.log("Elemento aggiunto alla lista dei preferiti");
            res.status(200).json({ message: 'Elemento aggiunto alla lista dei preferiti'});
        }
    } catch (error) {
        console.error('Errore durante l\'aggiunta o la rimozione del film preferito:', error);
        res.status(500).json({ error: 'Errore durante l\'aggiunta o la rimozione del film preferito' });
    }
}

const GetFavoriteStatusContentID = async (req, res) => {
    const { userId, itemId, type } = req.query;

    try {
        const findUser = await user.User.findOne({ _id: userId });

        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const favoriteItem = findUser.favoriteList.find(item => item.favoriteId === itemId && item.type === type);

        if (favoriteItem) {
            console.log('Elemento preferito trovato');
            res.status(200).json(favoriteItem);
        } else {
            console.log('Elemento preferito non trovato');
            res.status(404).json({ message: 'Favorite item not found' });
        }

    } catch (error) {
        console.error('Errore durante il recupero della lista dei preferiti:', error);
        res.status(500).json({ error: 'Errore durante il recupero della lista dei preferiti' });
    }
}

const AddContentID = async (req, res) => {
    const { userId, itemId, type, image, status, vote } = req.body;

    try {
        const findUser = await user.User.findOne({ _id: userId });

        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(type === 'film') {
            const findItem = findUser.filmList.some(item => item.filmId === itemId);

            if (findItem) {
                await user.User.findOneAndUpdate(
                    { _id: userId, 'filmList.filmId': itemId },
                    { $set: { 'filmList.$.status': status, 'filmList.$.vote': vote } }
                )
                console.log('Film aggiornato con successo')
                res.status(200).json({ message: 'Film aggiornato con successo' });
            } else {
                await user.User.findByIdAndUpdate(
                    userId,
                    { $addToSet: { filmList: { filmId: itemId, img: image, status: status, vote: vote } } }
                )
                console.log('Film aggiunto con successo')
                res.status(200).json({ message: 'Film aggiunto con successo' });
            }
        } else if (type === 'serie') {
            const findItem = findUser.serieList.some(item => item.serieId === itemId);

            if (findItem) {
                await user.User.findOneAndUpdate(
                    { _id: userId, 'serieList.serieId': itemId },
                    { $set: { 'serieList.$.status': status, 'serieList.$.vote': vote } }
                )
                console.log('Serie aggiornata con successo')
                res.status(200).json({ message: 'Serie aggiornata con successo' });
            } else {
                await user.User.findByIdAndUpdate(
                    userId,
                    { $addToSet: { serieList: { serieId: itemId, img: image, status: status, vote: vote } } }
                )
                console.log('Serie aggiunta con successo')
                res.status(200).json({ message: 'Serie aggiunta con successo' });
            }
        }
    } catch (error) {
        console.error('Errore durante il recupero della lista ', error);
        res.status(500).json({ error: 'Errore durante il recupero della lista' });
    }
}

const GetStatusContentID = async (req, res) => {
    const { userId, itemId, type } = req.query;

    try {
        const findUser = await user.User.findOne({ _id: userId });

        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(type === 'film') {
            const filmItem = findUser.filmList.find(item => item.filmId === itemId);

            if (filmItem) {
                console.log('Film trovato');
                res.status(200).json(filmItem);
            } else {
                console.log('Film non trovato');
                res.status(404).json({ message: 'Film not found' });
            }
        } else if (type === 'serie') {
            const serieItem = findUser.serieList.find(item => item.serieId === itemId);

            if (serieItem) {
                console.log('Serie trovata');
                res.status(200).json(serieItem);
            } else {
                console.log('Serie non trovata');
                res.status(404).json({ message: 'Serie not found' });
            }
        }
    } catch (error) {
        console.error('Errore durante il recupero dello stato del contenuto:', error);
        res.status(500).json({ error: 'Errore durante il recupero dello stato del contenuto' });
    }
}

module.exports = {
    FavoriteContentID,
    GetFavoriteStatusContentID,
    AddContentID,
    GetStatusContentID
}