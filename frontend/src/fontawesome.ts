import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCheckDouble,
  faComment,
  faComments,
  faEnvelope,
  faKey,
  faPaperPlane,
  faPencilAlt,
  faPlus,
  faSignature,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

// Para cada icono que se importe hay que anadirlo en la librería
library.add(
  // Solid
  faCheck,
  faCheckDouble,
  faComment,
  faComments,
  faKey,
  faEnvelope,
  faPaperPlane,
  faPencilAlt,
  faPlus,
  faSignature,
  faTrash,
  faUser,
);

export {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
