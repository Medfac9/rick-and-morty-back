import HttpException from './HttpException';

export default class DocumentNotFound extends HttpException {
  status = 404;

  message = 'Document not found';
}
