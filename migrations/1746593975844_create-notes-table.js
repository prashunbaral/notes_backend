const { MigrationBuilder } = require('node-pg-migrate');

exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: 'id', // shorthand for serial + primary key
    title: { type: 'varchar(100)', notNull: true },
    content: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('notes');
};
