module.exports = function(app) {
  var mysqlDs = app.dataSources.mysqlDS;
  var Book = app.models.Book;
  var Author = app.models.Author;

  // first autoupdate the `Author` model to avoid foreign key constraint failure
  mysqlDs.autoupdate('profile', function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `Author`.');

    mysqlDs.autoupdate('Book', function(err) {
      if (err) throw err;
      console.log('\nAutoupdated table `Book`.');
      // at this point the database table `Book` should have one foreign key `authorId` integrated
    });
  });
};
