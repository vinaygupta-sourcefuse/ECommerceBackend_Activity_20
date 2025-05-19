import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
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
  })
  createdAt?: string;

  @property({
    type: 'date',
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
    type: 'string',
  })
  shippedAt?: string;

  @property({
    type: 'string',
  })
  deliverAt?: string;

  @property({
    type: 'string',
  })
  shippingAddress?: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
