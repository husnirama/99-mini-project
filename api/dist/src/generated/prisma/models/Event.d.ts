import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Event
 *
 */
export type EventModel = runtime.Types.Result.DefaultSelection<Prisma.$EventPayload>;
export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null;
    _avg: EventAvgAggregateOutputType | null;
    _sum: EventSumAggregateOutputType | null;
    _min: EventMinAggregateOutputType | null;
    _max: EventMaxAggregateOutputType | null;
};
export type EventAvgAggregateOutputType = {
    id: number | null;
    organizeBy: number | null;
};
export type EventSumAggregateOutputType = {
    id: number | null;
    organizeBy: number | null;
};
export type EventMinAggregateOutputType = {
    id: number | null;
    organizeBy: number | null;
    title: string | null;
    category: string | null;
    image: string | null;
    eventDateStart: Date | null;
    eventDateEnd: Date | null;
    status: $Enums.eventStatus | null;
    eventDescription: string | null;
    eventTnC: string | null;
    termsAccepted: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type EventMaxAggregateOutputType = {
    id: number | null;
    organizeBy: number | null;
    title: string | null;
    category: string | null;
    image: string | null;
    eventDateStart: Date | null;
    eventDateEnd: Date | null;
    status: $Enums.eventStatus | null;
    eventDescription: string | null;
    eventTnC: string | null;
    termsAccepted: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type EventCountAggregateOutputType = {
    id: number;
    organizeBy: number;
    title: number;
    category: number;
    image: number;
    eventDateStart: number;
    eventDateEnd: number;
    status: number;
    eventDescription: number;
    eventTnC: number;
    termsAccepted: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type EventAvgAggregateInputType = {
    id?: true;
    organizeBy?: true;
};
export type EventSumAggregateInputType = {
    id?: true;
    organizeBy?: true;
};
export type EventMinAggregateInputType = {
    id?: true;
    organizeBy?: true;
    title?: true;
    category?: true;
    image?: true;
    eventDateStart?: true;
    eventDateEnd?: true;
    status?: true;
    eventDescription?: true;
    eventTnC?: true;
    termsAccepted?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type EventMaxAggregateInputType = {
    id?: true;
    organizeBy?: true;
    title?: true;
    category?: true;
    image?: true;
    eventDateStart?: true;
    eventDateEnd?: true;
    status?: true;
    eventDescription?: true;
    eventTnC?: true;
    termsAccepted?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type EventCountAggregateInputType = {
    id?: true;
    organizeBy?: true;
    title?: true;
    category?: true;
    image?: true;
    eventDateStart?: true;
    eventDateEnd?: true;
    status?: true;
    eventDescription?: true;
    eventTnC?: true;
    termsAccepted?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type EventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: Prisma.EventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Events to fetch.
     */
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Events.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType;
};
export type GetEventAggregateType<T extends EventAggregateArgs> = {
    [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEvent[P]> : Prisma.GetScalarType<T[P], AggregateEvent[P]>;
};
export type EventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithAggregationInput | Prisma.EventOrderByWithAggregationInput[];
    by: Prisma.EventScalarFieldEnum[] | Prisma.EventScalarFieldEnum;
    having?: Prisma.EventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EventCountAggregateInputType | true;
    _avg?: EventAvgAggregateInputType;
    _sum?: EventSumAggregateInputType;
    _min?: EventMinAggregateInputType;
    _max?: EventMaxAggregateInputType;
};
export type EventGroupByOutputType = {
    id: number;
    organizeBy: number;
    title: string;
    category: string | null;
    image: string | null;
    eventDateStart: Date;
    eventDateEnd: Date;
    status: $Enums.eventStatus;
    eventDescription: string | null;
    eventTnC: string | null;
    termsAccepted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: EventCountAggregateOutputType | null;
    _avg: EventAvgAggregateOutputType | null;
    _sum: EventSumAggregateOutputType | null;
    _min: EventMinAggregateOutputType | null;
    _max: EventMaxAggregateOutputType | null;
};
type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EventGroupByOutputType[P]>;
}>>;
export type EventWhereInput = {
    AND?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    OR?: Prisma.EventWhereInput[];
    NOT?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    id?: Prisma.IntFilter<"Event"> | number;
    organizeBy?: Prisma.IntFilter<"Event"> | number;
    title?: Prisma.StringFilter<"Event"> | string;
    category?: Prisma.StringNullableFilter<"Event"> | string | null;
    image?: Prisma.StringNullableFilter<"Event"> | string | null;
    eventDateStart?: Prisma.DateTimeFilter<"Event"> | Date | string;
    eventDateEnd?: Prisma.DateTimeFilter<"Event"> | Date | string;
    status?: Prisma.EnumeventStatusFilter<"Event"> | $Enums.eventStatus;
    eventDescription?: Prisma.StringNullableFilter<"Event"> | string | null;
    eventTnC?: Prisma.StringNullableFilter<"Event"> | string | null;
    termsAccepted?: Prisma.BoolFilter<"Event"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Event"> | Date | string | null;
    venue?: Prisma.VenueListRelationFilter;
    ticket?: Prisma.TicketTypeListRelationFilter;
    eventImage?: Prisma.EventImageListRelationFilter;
    promotion?: Prisma.PromotionListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type EventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizeBy?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventDateStart?: Prisma.SortOrder;
    eventDateEnd?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    eventDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventTnC?: Prisma.SortOrderInput | Prisma.SortOrder;
    termsAccepted?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    venue?: Prisma.VenueOrderByRelationAggregateInput;
    ticket?: Prisma.TicketTypeOrderByRelationAggregateInput;
    eventImage?: Prisma.EventImageOrderByRelationAggregateInput;
    promotion?: Prisma.PromotionOrderByRelationAggregateInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    organizeBy_title?: Prisma.EventOrganizeByTitleCompoundUniqueInput;
    AND?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    OR?: Prisma.EventWhereInput[];
    NOT?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    organizeBy?: Prisma.IntFilter<"Event"> | number;
    title?: Prisma.StringFilter<"Event"> | string;
    category?: Prisma.StringNullableFilter<"Event"> | string | null;
    image?: Prisma.StringNullableFilter<"Event"> | string | null;
    eventDateStart?: Prisma.DateTimeFilter<"Event"> | Date | string;
    eventDateEnd?: Prisma.DateTimeFilter<"Event"> | Date | string;
    status?: Prisma.EnumeventStatusFilter<"Event"> | $Enums.eventStatus;
    eventDescription?: Prisma.StringNullableFilter<"Event"> | string | null;
    eventTnC?: Prisma.StringNullableFilter<"Event"> | string | null;
    termsAccepted?: Prisma.BoolFilter<"Event"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Event"> | Date | string | null;
    venue?: Prisma.VenueListRelationFilter;
    ticket?: Prisma.TicketTypeListRelationFilter;
    eventImage?: Prisma.EventImageListRelationFilter;
    promotion?: Prisma.PromotionListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "organizeBy_title">;
export type EventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizeBy?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventDateStart?: Prisma.SortOrder;
    eventDateEnd?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    eventDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventTnC?: Prisma.SortOrderInput | Prisma.SortOrder;
    termsAccepted?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.EventCountOrderByAggregateInput;
    _avg?: Prisma.EventAvgOrderByAggregateInput;
    _max?: Prisma.EventMaxOrderByAggregateInput;
    _min?: Prisma.EventMinOrderByAggregateInput;
    _sum?: Prisma.EventSumOrderByAggregateInput;
};
export type EventScalarWhereWithAggregatesInput = {
    AND?: Prisma.EventScalarWhereWithAggregatesInput | Prisma.EventScalarWhereWithAggregatesInput[];
    OR?: Prisma.EventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EventScalarWhereWithAggregatesInput | Prisma.EventScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Event"> | number;
    organizeBy?: Prisma.IntWithAggregatesFilter<"Event"> | number;
    title?: Prisma.StringWithAggregatesFilter<"Event"> | string;
    category?: Prisma.StringNullableWithAggregatesFilter<"Event"> | string | null;
    image?: Prisma.StringNullableWithAggregatesFilter<"Event"> | string | null;
    eventDateStart?: Prisma.DateTimeWithAggregatesFilter<"Event"> | Date | string;
    eventDateEnd?: Prisma.DateTimeWithAggregatesFilter<"Event"> | Date | string;
    status?: Prisma.EnumeventStatusWithAggregatesFilter<"Event"> | $Enums.eventStatus;
    eventDescription?: Prisma.StringNullableWithAggregatesFilter<"Event"> | string | null;
    eventTnC?: Prisma.StringNullableWithAggregatesFilter<"Event"> | string | null;
    termsAccepted?: Prisma.BoolWithAggregatesFilter<"Event"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Event"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null;
};
export type EventCreateInput = {
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionCreateNestedManyWithoutEventInput;
    user: Prisma.UserCreateNestedOneWithoutEventInput;
};
export type EventUncheckedCreateInput = {
    id?: number;
    organizeBy: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueUncheckedCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeUncheckedCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageUncheckedCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionUncheckedCreateNestedManyWithoutEventInput;
};
export type EventUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUpdateManyWithoutEventNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEventNestedInput;
};
export type EventUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    organizeBy?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUncheckedUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUncheckedUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUncheckedUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventCreateManyInput = {
    id?: number;
    organizeBy: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type EventUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type EventUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    organizeBy?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type EventListRelationFilter = {
    every?: Prisma.EventWhereInput;
    some?: Prisma.EventWhereInput;
    none?: Prisma.EventWhereInput;
};
export type EventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EventOrganizeByTitleCompoundUniqueInput = {
    organizeBy: number;
    title: string;
};
export type EventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizeBy?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    eventDateStart?: Prisma.SortOrder;
    eventDateEnd?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    eventDescription?: Prisma.SortOrder;
    eventTnC?: Prisma.SortOrder;
    termsAccepted?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type EventAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizeBy?: Prisma.SortOrder;
};
export type EventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizeBy?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    eventDateStart?: Prisma.SortOrder;
    eventDateEnd?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    eventDescription?: Prisma.SortOrder;
    eventTnC?: Prisma.SortOrder;
    termsAccepted?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type EventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizeBy?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    eventDateStart?: Prisma.SortOrder;
    eventDateEnd?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    eventDescription?: Prisma.SortOrder;
    eventTnC?: Prisma.SortOrder;
    termsAccepted?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type EventSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizeBy?: Prisma.SortOrder;
};
export type EventScalarRelationFilter = {
    is?: Prisma.EventWhereInput;
    isNot?: Prisma.EventWhereInput;
};
export type EventCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutUserInput, Prisma.EventUncheckedCreateWithoutUserInput> | Prisma.EventCreateWithoutUserInput[] | Prisma.EventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutUserInput | Prisma.EventCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EventCreateManyUserInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutUserInput, Prisma.EventUncheckedCreateWithoutUserInput> | Prisma.EventCreateWithoutUserInput[] | Prisma.EventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutUserInput | Prisma.EventCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EventCreateManyUserInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutUserInput, Prisma.EventUncheckedCreateWithoutUserInput> | Prisma.EventCreateWithoutUserInput[] | Prisma.EventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutUserInput | Prisma.EventCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutUserInput | Prisma.EventUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EventCreateManyUserInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutUserInput | Prisma.EventUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutUserInput | Prisma.EventUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutUserInput, Prisma.EventUncheckedCreateWithoutUserInput> | Prisma.EventCreateWithoutUserInput[] | Prisma.EventUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutUserInput | Prisma.EventCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutUserInput | Prisma.EventUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EventCreateManyUserInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutUserInput | Prisma.EventUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutUserInput | Prisma.EventUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EnumeventStatusFieldUpdateOperationsInput = {
    set?: $Enums.eventStatus;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type EventCreateNestedOneWithoutEventImageInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutEventImageInput, Prisma.EventUncheckedCreateWithoutEventImageInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutEventImageInput;
    connect?: Prisma.EventWhereUniqueInput;
};
export type EventUpdateOneRequiredWithoutEventImageNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutEventImageInput, Prisma.EventUncheckedCreateWithoutEventImageInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutEventImageInput;
    upsert?: Prisma.EventUpsertWithoutEventImageInput;
    connect?: Prisma.EventWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EventUpdateToOneWithWhereWithoutEventImageInput, Prisma.EventUpdateWithoutEventImageInput>, Prisma.EventUncheckedUpdateWithoutEventImageInput>;
};
export type EventCreateNestedOneWithoutVenueInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutVenueInput, Prisma.EventUncheckedCreateWithoutVenueInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutVenueInput;
    connect?: Prisma.EventWhereUniqueInput;
};
export type EventUpdateOneRequiredWithoutVenueNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutVenueInput, Prisma.EventUncheckedCreateWithoutVenueInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutVenueInput;
    upsert?: Prisma.EventUpsertWithoutVenueInput;
    connect?: Prisma.EventWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EventUpdateToOneWithWhereWithoutVenueInput, Prisma.EventUpdateWithoutVenueInput>, Prisma.EventUncheckedUpdateWithoutVenueInput>;
};
export type EventCreateNestedOneWithoutTicketInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutTicketInput, Prisma.EventUncheckedCreateWithoutTicketInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutTicketInput;
    connect?: Prisma.EventWhereUniqueInput;
};
export type EventUpdateOneRequiredWithoutTicketNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutTicketInput, Prisma.EventUncheckedCreateWithoutTicketInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutTicketInput;
    upsert?: Prisma.EventUpsertWithoutTicketInput;
    connect?: Prisma.EventWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EventUpdateToOneWithWhereWithoutTicketInput, Prisma.EventUpdateWithoutTicketInput>, Prisma.EventUncheckedUpdateWithoutTicketInput>;
};
export type EventCreateNestedOneWithoutPromotionInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutPromotionInput, Prisma.EventUncheckedCreateWithoutPromotionInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutPromotionInput;
    connect?: Prisma.EventWhereUniqueInput;
};
export type EventUpdateOneRequiredWithoutPromotionNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutPromotionInput, Prisma.EventUncheckedCreateWithoutPromotionInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutPromotionInput;
    upsert?: Prisma.EventUpsertWithoutPromotionInput;
    connect?: Prisma.EventWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EventUpdateToOneWithWhereWithoutPromotionInput, Prisma.EventUpdateWithoutPromotionInput>, Prisma.EventUncheckedUpdateWithoutPromotionInput>;
};
export type EventCreateWithoutUserInput = {
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionCreateNestedManyWithoutEventInput;
};
export type EventUncheckedCreateWithoutUserInput = {
    id?: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueUncheckedCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeUncheckedCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageUncheckedCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutUserInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutUserInput, Prisma.EventUncheckedCreateWithoutUserInput>;
};
export type EventCreateManyUserInputEnvelope = {
    data: Prisma.EventCreateManyUserInput | Prisma.EventCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type EventUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.EventWhereUniqueInput;
    update: Prisma.XOR<Prisma.EventUpdateWithoutUserInput, Prisma.EventUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutUserInput, Prisma.EventUncheckedCreateWithoutUserInput>;
};
export type EventUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutUserInput, Prisma.EventUncheckedUpdateWithoutUserInput>;
};
export type EventUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.EventScalarWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyWithoutUserInput>;
};
export type EventScalarWhereInput = {
    AND?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
    OR?: Prisma.EventScalarWhereInput[];
    NOT?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
    id?: Prisma.IntFilter<"Event"> | number;
    organizeBy?: Prisma.IntFilter<"Event"> | number;
    title?: Prisma.StringFilter<"Event"> | string;
    category?: Prisma.StringNullableFilter<"Event"> | string | null;
    image?: Prisma.StringNullableFilter<"Event"> | string | null;
    eventDateStart?: Prisma.DateTimeFilter<"Event"> | Date | string;
    eventDateEnd?: Prisma.DateTimeFilter<"Event"> | Date | string;
    status?: Prisma.EnumeventStatusFilter<"Event"> | $Enums.eventStatus;
    eventDescription?: Prisma.StringNullableFilter<"Event"> | string | null;
    eventTnC?: Prisma.StringNullableFilter<"Event"> | string | null;
    termsAccepted?: Prisma.BoolFilter<"Event"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Event"> | Date | string | null;
};
export type EventCreateWithoutEventImageInput = {
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionCreateNestedManyWithoutEventInput;
    user: Prisma.UserCreateNestedOneWithoutEventInput;
};
export type EventUncheckedCreateWithoutEventImageInput = {
    id?: number;
    organizeBy: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueUncheckedCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeUncheckedCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutEventImageInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutEventImageInput, Prisma.EventUncheckedCreateWithoutEventImageInput>;
};
export type EventUpsertWithoutEventImageInput = {
    update: Prisma.XOR<Prisma.EventUpdateWithoutEventImageInput, Prisma.EventUncheckedUpdateWithoutEventImageInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutEventImageInput, Prisma.EventUncheckedCreateWithoutEventImageInput>;
    where?: Prisma.EventWhereInput;
};
export type EventUpdateToOneWithWhereWithoutEventImageInput = {
    where?: Prisma.EventWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutEventImageInput, Prisma.EventUncheckedUpdateWithoutEventImageInput>;
};
export type EventUpdateWithoutEventImageInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUpdateManyWithoutEventNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutEventImageInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    organizeBy?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUncheckedUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUncheckedUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventCreateWithoutVenueInput = {
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    ticket?: Prisma.TicketTypeCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionCreateNestedManyWithoutEventInput;
    user: Prisma.UserCreateNestedOneWithoutEventInput;
};
export type EventUncheckedCreateWithoutVenueInput = {
    id?: number;
    organizeBy: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    ticket?: Prisma.TicketTypeUncheckedCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageUncheckedCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutVenueInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutVenueInput, Prisma.EventUncheckedCreateWithoutVenueInput>;
};
export type EventUpsertWithoutVenueInput = {
    update: Prisma.XOR<Prisma.EventUpdateWithoutVenueInput, Prisma.EventUncheckedUpdateWithoutVenueInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutVenueInput, Prisma.EventUncheckedCreateWithoutVenueInput>;
    where?: Prisma.EventWhereInput;
};
export type EventUpdateToOneWithWhereWithoutVenueInput = {
    where?: Prisma.EventWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutVenueInput, Prisma.EventUncheckedUpdateWithoutVenueInput>;
};
export type EventUpdateWithoutVenueInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ticket?: Prisma.TicketTypeUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUpdateManyWithoutEventNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutVenueInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    organizeBy?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ticket?: Prisma.TicketTypeUncheckedUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUncheckedUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventCreateWithoutTicketInput = {
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionCreateNestedManyWithoutEventInput;
    user: Prisma.UserCreateNestedOneWithoutEventInput;
};
export type EventUncheckedCreateWithoutTicketInput = {
    id?: number;
    organizeBy: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueUncheckedCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageUncheckedCreateNestedManyWithoutEventInput;
    promotion?: Prisma.PromotionUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutTicketInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutTicketInput, Prisma.EventUncheckedCreateWithoutTicketInput>;
};
export type EventUpsertWithoutTicketInput = {
    update: Prisma.XOR<Prisma.EventUpdateWithoutTicketInput, Prisma.EventUncheckedUpdateWithoutTicketInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutTicketInput, Prisma.EventUncheckedCreateWithoutTicketInput>;
    where?: Prisma.EventWhereInput;
};
export type EventUpdateToOneWithWhereWithoutTicketInput = {
    where?: Prisma.EventWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutTicketInput, Prisma.EventUncheckedUpdateWithoutTicketInput>;
};
export type EventUpdateWithoutTicketInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUpdateManyWithoutEventNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutTicketInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    organizeBy?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUncheckedUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUncheckedUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventCreateWithoutPromotionInput = {
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageCreateNestedManyWithoutEventInput;
    user: Prisma.UserCreateNestedOneWithoutEventInput;
};
export type EventUncheckedCreateWithoutPromotionInput = {
    id?: number;
    organizeBy: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    venue?: Prisma.VenueUncheckedCreateNestedManyWithoutEventInput;
    ticket?: Prisma.TicketTypeUncheckedCreateNestedManyWithoutEventInput;
    eventImage?: Prisma.EventImageUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutPromotionInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutPromotionInput, Prisma.EventUncheckedCreateWithoutPromotionInput>;
};
export type EventUpsertWithoutPromotionInput = {
    update: Prisma.XOR<Prisma.EventUpdateWithoutPromotionInput, Prisma.EventUncheckedUpdateWithoutPromotionInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutPromotionInput, Prisma.EventUncheckedCreateWithoutPromotionInput>;
    where?: Prisma.EventWhereInput;
};
export type EventUpdateToOneWithWhereWithoutPromotionInput = {
    where?: Prisma.EventWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutPromotionInput, Prisma.EventUncheckedUpdateWithoutPromotionInput>;
};
export type EventUpdateWithoutPromotionInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUpdateManyWithoutEventNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutPromotionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    organizeBy?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUncheckedUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUncheckedUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventCreateManyUserInput = {
    id?: number;
    title: string;
    category?: string | null;
    image?: string | null;
    eventDateStart: Date | string;
    eventDateEnd: Date | string;
    status?: $Enums.eventStatus;
    eventDescription?: string | null;
    eventTnC?: string | null;
    termsAccepted?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type EventUpdateWithoutUserInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    venue?: Prisma.VenueUncheckedUpdateManyWithoutEventNestedInput;
    ticket?: Prisma.TicketTypeUncheckedUpdateManyWithoutEventNestedInput;
    eventImage?: Prisma.EventImageUncheckedUpdateManyWithoutEventNestedInput;
    promotion?: Prisma.PromotionUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventDateStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventDateEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumeventStatusFieldUpdateOperationsInput | $Enums.eventStatus;
    eventDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTnC?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    termsAccepted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type EventCountOutputType
 */
export type EventCountOutputType = {
    venue: number;
    ticket: number;
    eventImage: number;
    promotion: number;
};
export type EventCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    venue?: boolean | EventCountOutputTypeCountVenueArgs;
    ticket?: boolean | EventCountOutputTypeCountTicketArgs;
    eventImage?: boolean | EventCountOutputTypeCountEventImageArgs;
    promotion?: boolean | EventCountOutputTypeCountPromotionArgs;
};
/**
 * EventCountOutputType without action
 */
export type EventCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: Prisma.EventCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * EventCountOutputType without action
 */
export type EventCountOutputTypeCountVenueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VenueWhereInput;
};
/**
 * EventCountOutputType without action
 */
export type EventCountOutputTypeCountTicketArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TicketTypeWhereInput;
};
/**
 * EventCountOutputType without action
 */
export type EventCountOutputTypeCountEventImageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventImageWhereInput;
};
/**
 * EventCountOutputType without action
 */
export type EventCountOutputTypeCountPromotionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionWhereInput;
};
export type EventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizeBy?: boolean;
    title?: boolean;
    category?: boolean;
    image?: boolean;
    eventDateStart?: boolean;
    eventDateEnd?: boolean;
    status?: boolean;
    eventDescription?: boolean;
    eventTnC?: boolean;
    termsAccepted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    venue?: boolean | Prisma.Event$venueArgs<ExtArgs>;
    ticket?: boolean | Prisma.Event$ticketArgs<ExtArgs>;
    eventImage?: boolean | Prisma.Event$eventImageArgs<ExtArgs>;
    promotion?: boolean | Prisma.Event$promotionArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.EventCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["event"]>;
export type EventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizeBy?: boolean;
    title?: boolean;
    category?: boolean;
    image?: boolean;
    eventDateStart?: boolean;
    eventDateEnd?: boolean;
    status?: boolean;
    eventDescription?: boolean;
    eventTnC?: boolean;
    termsAccepted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["event"]>;
export type EventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizeBy?: boolean;
    title?: boolean;
    category?: boolean;
    image?: boolean;
    eventDateStart?: boolean;
    eventDateEnd?: boolean;
    status?: boolean;
    eventDescription?: boolean;
    eventTnC?: boolean;
    termsAccepted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["event"]>;
export type EventSelectScalar = {
    id?: boolean;
    organizeBy?: boolean;
    title?: boolean;
    category?: boolean;
    image?: boolean;
    eventDateStart?: boolean;
    eventDateEnd?: boolean;
    status?: boolean;
    eventDescription?: boolean;
    eventTnC?: boolean;
    termsAccepted?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type EventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizeBy" | "title" | "category" | "image" | "eventDateStart" | "eventDateEnd" | "status" | "eventDescription" | "eventTnC" | "termsAccepted" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["event"]>;
export type EventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    venue?: boolean | Prisma.Event$venueArgs<ExtArgs>;
    ticket?: boolean | Prisma.Event$ticketArgs<ExtArgs>;
    eventImage?: boolean | Prisma.Event$eventImageArgs<ExtArgs>;
    promotion?: boolean | Prisma.Event$promotionArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.EventCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $EventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Event";
    objects: {
        venue: Prisma.$VenuePayload<ExtArgs>[];
        ticket: Prisma.$TicketTypePayload<ExtArgs>[];
        eventImage: Prisma.$EventImagePayload<ExtArgs>[];
        promotion: Prisma.$PromotionPayload<ExtArgs>[];
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        organizeBy: number;
        title: string;
        category: string | null;
        image: string | null;
        eventDateStart: Date;
        eventDateEnd: Date;
        status: $Enums.eventStatus;
        eventDescription: string | null;
        eventTnC: string | null;
        termsAccepted: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["event"]>;
    composites: {};
};
export type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EventPayload, S>;
export type EventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EventCountAggregateInputType | true;
};
export interface EventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Event'];
        meta: {
            name: 'Event';
        };
    };
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: Prisma.SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: Prisma.SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     *
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EventFindManyArgs>(args?: Prisma.SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     *
     */
    create<T extends EventCreateArgs>(args: Prisma.SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EventCreateManyArgs>(args?: Prisma.SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     *
     */
    delete<T extends EventDeleteArgs>(args: Prisma.SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EventUpdateArgs>(args: Prisma.SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: Prisma.SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EventUpdateManyArgs>(args: Prisma.SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: Prisma.SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(args?: Prisma.Subset<T, EventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EventCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Prisma.Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>;
    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends EventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EventGroupByArgs['orderBy'];
    } : {
        orderBy?: EventGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Event model
     */
    readonly fields: EventFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Event.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    venue<T extends Prisma.Event$venueArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Event$venueArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ticket<T extends Prisma.Event$ticketArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Event$ticketArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TicketTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    eventImage<T extends Prisma.Event$eventImageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Event$eventImageArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    promotion<T extends Prisma.Event$promotionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Event$promotionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Event model
 */
export interface EventFieldRefs {
    readonly id: Prisma.FieldRef<"Event", 'Int'>;
    readonly organizeBy: Prisma.FieldRef<"Event", 'Int'>;
    readonly title: Prisma.FieldRef<"Event", 'String'>;
    readonly category: Prisma.FieldRef<"Event", 'String'>;
    readonly image: Prisma.FieldRef<"Event", 'String'>;
    readonly eventDateStart: Prisma.FieldRef<"Event", 'DateTime'>;
    readonly eventDateEnd: Prisma.FieldRef<"Event", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Event", 'eventStatus'>;
    readonly eventDescription: Prisma.FieldRef<"Event", 'String'>;
    readonly eventTnC: Prisma.FieldRef<"Event", 'String'>;
    readonly termsAccepted: Prisma.FieldRef<"Event", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Event", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Event", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Event", 'DateTime'>;
}
/**
 * Event findUnique
 */
export type EventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * Filter, which Event to fetch.
     */
    where: Prisma.EventWhereUniqueInput;
};
/**
 * Event findUniqueOrThrow
 */
export type EventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * Filter, which Event to fetch.
     */
    where: Prisma.EventWhereUniqueInput;
};
/**
 * Event findFirst
 */
export type EventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * Filter, which Event to fetch.
     */
    where?: Prisma.EventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Events to fetch.
     */
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Events.
     */
    cursor?: Prisma.EventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Events.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Events.
     */
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
/**
 * Event findFirstOrThrow
 */
export type EventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * Filter, which Event to fetch.
     */
    where?: Prisma.EventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Events to fetch.
     */
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Events.
     */
    cursor?: Prisma.EventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Events.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Events.
     */
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
/**
 * Event findMany
 */
export type EventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * Filter, which Events to fetch.
     */
    where?: Prisma.EventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Events to fetch.
     */
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Events.
     */
    cursor?: Prisma.EventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Events.
     */
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
/**
 * Event create
 */
export type EventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * The data needed to create a Event.
     */
    data: Prisma.XOR<Prisma.EventCreateInput, Prisma.EventUncheckedCreateInput>;
};
/**
 * Event createMany
 */
export type EventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: Prisma.EventCreateManyInput | Prisma.EventCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Event createManyAndReturn
 */
export type EventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * The data used to create many Events.
     */
    data: Prisma.EventCreateManyInput | Prisma.EventCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Event update
 */
export type EventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * The data needed to update a Event.
     */
    data: Prisma.XOR<Prisma.EventUpdateInput, Prisma.EventUncheckedUpdateInput>;
    /**
     * Choose, which Event to update.
     */
    where: Prisma.EventWhereUniqueInput;
};
/**
 * Event updateMany
 */
export type EventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyInput>;
    /**
     * Filter which Events to update
     */
    where?: Prisma.EventWhereInput;
    /**
     * Limit how many Events to update.
     */
    limit?: number;
};
/**
 * Event updateManyAndReturn
 */
export type EventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * The data used to update Events.
     */
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyInput>;
    /**
     * Filter which Events to update
     */
    where?: Prisma.EventWhereInput;
    /**
     * Limit how many Events to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Event upsert
 */
export type EventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: Prisma.EventWhereUniqueInput;
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: Prisma.XOR<Prisma.EventCreateInput, Prisma.EventUncheckedCreateInput>;
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EventUpdateInput, Prisma.EventUncheckedUpdateInput>;
};
/**
 * Event delete
 */
export type EventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    /**
     * Filter which Event to delete.
     */
    where: Prisma.EventWhereUniqueInput;
};
/**
 * Event deleteMany
 */
export type EventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: Prisma.EventWhereInput;
    /**
     * Limit how many Events to delete.
     */
    limit?: number;
};
/**
 * Event.venue
 */
export type Event$venueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: Prisma.VenueSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Venue
     */
    omit?: Prisma.VenueOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VenueInclude<ExtArgs> | null;
    where?: Prisma.VenueWhereInput;
    orderBy?: Prisma.VenueOrderByWithRelationInput | Prisma.VenueOrderByWithRelationInput[];
    cursor?: Prisma.VenueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VenueScalarFieldEnum | Prisma.VenueScalarFieldEnum[];
};
/**
 * Event.ticket
 */
export type Event$ticketArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketType
     */
    select?: Prisma.TicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TicketType
     */
    omit?: Prisma.TicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TicketTypeInclude<ExtArgs> | null;
    where?: Prisma.TicketTypeWhereInput;
    orderBy?: Prisma.TicketTypeOrderByWithRelationInput | Prisma.TicketTypeOrderByWithRelationInput[];
    cursor?: Prisma.TicketTypeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TicketTypeScalarFieldEnum | Prisma.TicketTypeScalarFieldEnum[];
};
/**
 * Event.eventImage
 */
export type Event$eventImageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventImage
     */
    select?: Prisma.EventImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventImage
     */
    omit?: Prisma.EventImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventImageInclude<ExtArgs> | null;
    where?: Prisma.EventImageWhereInput;
    orderBy?: Prisma.EventImageOrderByWithRelationInput | Prisma.EventImageOrderByWithRelationInput[];
    cursor?: Prisma.EventImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventImageScalarFieldEnum | Prisma.EventImageScalarFieldEnum[];
};
/**
 * Event.promotion
 */
export type Event$promotionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: Prisma.PromotionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Promotion
     */
    omit?: Prisma.PromotionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PromotionInclude<ExtArgs> | null;
    where?: Prisma.PromotionWhereInput;
    orderBy?: Prisma.PromotionOrderByWithRelationInput | Prisma.PromotionOrderByWithRelationInput[];
    cursor?: Prisma.PromotionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionScalarFieldEnum | Prisma.PromotionScalarFieldEnum[];
};
/**
 * Event without action
 */
export type EventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Event.d.ts.map