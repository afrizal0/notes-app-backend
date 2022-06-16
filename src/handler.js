const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (request, h) => {
  const { title, tag, body } = request.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;
  const newNote = {
    id, title, tag, body, createAt, updateAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
        title,
        tag,
        body,
        createAt,
        updateAt,
      },
    });
    response.code = 200;
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code = 500;
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((item) => item.id === id);
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};
const editNoteById = (request, h) => {
  const { id } = request.params;
  const { title, tag, body } = request.payload;
  const updateAt = new Date().toISOString();
  const index = notes.findIndex((item) => item.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tag,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'catatan berhasil diperbaharui',
    });
    response.code = 200;
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });
  response.code = 404;
  return response;
};

const deleteNoteById = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((item) => item.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus catatan',
    });
    console.log(notes);
    response.code = 200;
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code = 404;
  return response;
};

module.exports = {
  addNotesHandler, getAllNotesHandler, getNoteHandler, editNoteById, deleteNoteById,
};
