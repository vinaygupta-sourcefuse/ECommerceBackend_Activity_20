import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

   @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  updatedAt?: string;

  @property({
    type: 'number',
    default: 0,
  })
  subtotal?: number;

  @property({
    type: 'number',
    default: 0,
  })
  taxAmount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  shippingAmount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  discountAmount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  grandTotal?: number;

  @property({
    type: 'string',
      jsonSchema: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$',
    },
  })
  user_email?: string;

  @property({
    type: 'string',
  })
  shippingMethod?: string;

  @property({
    type: 'string',
  })
  shippingStatus?: string;

  @property({
    type: 'string',
  })
  trackingNumber?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  shippedAt?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  deliverAt?: string;

  @property({
    type: 'string',
  })
  shippingAddress?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    jsonSchema: {
      pattern: '^[0-9]{10}$',
    },
  })
  phone?: string;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
