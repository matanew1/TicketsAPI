import { AppModule } from './../src/modules/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import invalidDateTicket from './mock/invalid.date.ticket.json';
import validTicket from './mock/valid.ticket.json';

describe('TicketController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('BASIC TESTS', () => {
    describe('/tickets (GET)', () => {
      it('should return 200', () => {
        return request(app.getHttpServer()).get('/tickets').expect(200);
      });
      it('should return 200 with query params', () => {
        return request(app.getHttpServer())
          .get('/tickets?title=Concert Ticket')
          .expect(200);
      });
      it('should return 404 for invalid query params', () => {
        return request(app.getHttpServer())
          .get('/tickets?title=Conc')
          .expect(404);
      });
    });

    describe('/tickets (POST)', () => {
      it('should return 400 for invalid date', () => {
        return request(app.getHttpServer())
          .post('/tickets')
          .send(invalidDateTicket)
          .expect(400);
      });

      it('should return 201 for valid ticket', () => {
        return request(app.getHttpServer())
          .post('/tickets')
          .send(validTicket)
          .expect(201);
      });
    });

    describe('/tickets (PUT)', () => {
      it('should return 404 for ticket not exist', () => {
        return request(app.getHttpServer())
          .put('/tickets/1')
          .send(invalidDateTicket)
          .expect(404);
      });

      it('should return 404 for invalid date', () => {
        return request(app.getHttpServer())
          .put('/tickets/56')
          .send(invalidDateTicket)
          .expect(404);
      });

      it('should return 200 for valid ticket', () => {
        return request(app.getHttpServer())
          .put('/tickets/51')
          .send(validTicket)
          .expect(200);
      });
    });

    describe('/tickets (DELETE)', () => {
      it('should return 404 for ticket not exist', () => {
        return request(app.getHttpServer()).delete('/tickets/1').expect(404);
      });

      // it('should return 200 for valid ticket', () => {
      //   return request(app.getHttpServer()).delete('/tickets/62').expect(200);
      // });
    });

    describe('/tickets/:id (GET)', () => {
      it('should return 404 for ticket not exist', () => {
        return request(app.getHttpServer()).get('/tickets/1').expect(404);
      });

      it('should return 200 for valid ticket', () => {
        return request(app.getHttpServer()).get('/tickets/67').expect(200);
      });
    });

    describe('/tickets/ratings (POST)', () => {
      it('should return 400 for invalid rating', () => {
        return request(app.getHttpServer())
          .post('/tickets/ratings')
          .send({ rating: 6, ticketId: 62 })
          .expect(400);
      });

      it('should return 201 for valid rating', () => {
        return request(app.getHttpServer())
          .post('/tickets/ratings')
          .send({ rating: 5, ticketId: 47 })
          .expect(201);
      });

      it('should return 404 for ticket not exist', () => {
        return request(app.getHttpServer())
          .post('/tickets/ratings')
          .send({ rating: 5, ticketId: 1 })
          .expect(404);
      });
    });
  });

  describe('ADVANCED TESTS', () => {
    it('should create a ticket, check if it exists, update it, and delete it', async () => {
      const ticket = await request(app.getHttpServer())
        .post('/tickets')
        .send(validTicket)
        .expect(201);

      const ticketId = ticket.body.id;
      await request(app.getHttpServer())
        .get(`/tickets/${ticketId}`)
        .expect(200);

      await request(app.getHttpServer())
        .put(`/tickets/${ticketId}`)
        .send(validTicket)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/tickets/${ticketId}`)
        .expect(200);
    });

    it('should create a ticket, rate it and check if it exists', async () => {
      const ticket = await request(app.getHttpServer())
        .post('/tickets')
        .send(validTicket)
        .expect(201);

      const ticketId = ticket.body.id;
      await request(app.getHttpServer())
        .post('/tickets/ratings')
        .send({ rating: 5, ticketId })
        .expect(201);

      await request(app.getHttpServer())
        .get(`/tickets/${ticketId}`)
        .expect(200);
    });
  });
});
