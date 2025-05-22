import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Orderitem} from '../models';
import {OrderitemRepository} from '../repositories';

export class OrderitemController {
  constructor(
    @repository(OrderitemRepository)
    public orderitemRepository : OrderitemRepository,
  ) {}

  @post('/orderitems')
  @response(200, {
    description: 'Orderitem model instance',
    content: {'application/json': {schema: getModelSchemaRef(Orderitem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderitem, {
            title: 'NewOrderitem',
            
          }),
        },
      },
    })
    orderitem: Orderitem,
  ): Promise<Orderitem> {
    return this.orderitemRepository.create(orderitem);
  }

  @get('/orderitems/count')
  @response(200, {
    description: 'Orderitem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Orderitem) where?: Where<Orderitem>,
  ): Promise<Count> {
    return this.orderitemRepository.count(where);
  }

  @get('/orderitems')
  @response(200, {
    description: 'Array of Orderitem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orderitem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Orderitem) filter?: Filter<Orderitem>,
  ): Promise<Orderitem[]> {
    return this.orderitemRepository.find(filter);
  }

  @patch('/orderitems')
  @response(200, {
    description: 'Orderitem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderitem, {partial: true}),
        },
      },
    })
    orderitem: Orderitem,
    @param.where(Orderitem) where?: Where<Orderitem>,
  ): Promise<Count> {
    return this.orderitemRepository.updateAll(orderitem, where);
  }

  @get('/orderitems/{id}')
  @response(200, {
    description: 'Orderitem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Orderitem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Orderitem, {exclude: 'where'}) filter?: FilterExcludingWhere<Orderitem>
  ): Promise<Orderitem> {
    return this.orderitemRepository.findById(id, filter);
  }

  @patch('/orderitems/{id}')
  @response(204, {
    description: 'Orderitem PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderitem, {partial: true}),
        },
      },
    })
    orderitem: Orderitem,
  ): Promise<void> {
    await this.orderitemRepository.updateById(id, orderitem);
  }

  @put('/orderitems/{id}')
  @response(204, {
    description: 'Orderitem PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderitem: Orderitem,
  ): Promise<void> {
    await this.orderitemRepository.replaceById(id, orderitem);
  }

  @del('/orderitems/{id}')
  @response(204, {
    description: 'Orderitem DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderitemRepository.deleteById(id);
  }
}
