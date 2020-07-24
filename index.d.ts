export type DateTime = string;
// https://docs.developer.amazonservices.com/en_UK/easy_ship/EasyShip_Datatypes.html
export type Dimensions = {
    Length: number;
    Width: number;
    Height: number;
    Unit: 'cm'; // TODO: is 'cm' really the only valid option? that's what the docs indicate.
    Name?: string;
};
export type InvoiceData = {
    InvoiceNumber: string;
    InvoiceDate?: DateTime;
};
export type Item = {
    OrderItemId: string;
    OrderItemSerialNumberList: string;
};
export type ScheduledPackageId = {
    AmazonOrderId: string;
    PackageId?: string;
};
export type Weight = {
    Value: number;
    Unit: 'g'; // TODO: is 'g' really the only valid option? that's what the docs indicate.
};
export type PickupSlot = {
    SlotId: string;
    PickupTimeStart?: string;
    PickupTimeEnd?: string;
};
export type Package = {
    ScheduledPackageId: ScheduledPackageId;
    PackageDimensions: Dimensions;
    PackageWeight: Weight;
    PackageItemsList?: Array<Item>;
    PackagePickupSlot: PickupSlot;
    PackageIdentifier?: string;
    Invoice?: InvoiceData;
    PackageStatus?: 'Unscheduled' | 'Scheduled';
};
export type PackageRequestDetails = {
    PackageDimensions?: Dimensions;
    PackageWeight?: Weight;
    PackageItemList?: Array<Item>;
    PackagePickupSlot: PickupSlot;
    PackageIdentifier?: string;
};
export type ScheduledPackageUpdateDetails = {
    ScheduledPackageId: ScheduledPackageId;
    PackagePickupSlot: PickupSlot;
};
// https://docs.developer.amazonservices.com/en_UK/feeds/Feeds_Datatypes.html
export type FeedSubmissionInfo = {
    FeedSubmissionId: string;
    FeedType: string;
    SubmittedDate: DateTime;
    FeedProcessingStatus: string;
    StartedProcessingDate: DateTime;
    CompletedProcessingDate: DateTime;
};
// https://docs.developer.amazonservices.com/en_UK/finances/Finances_Datatypes.html
export type CurrencyAmount = {
    CurrencyCode?: string;
    CurrencyAmount?: number;
};
export type AdjustmentItem = {
    Quantity?: string;
    PerUnitAmount?: CurrencyAmount;
    TotalAmount?: CurrencyAmount;
    SellerSKU?: string;
    FnSKU?: string;
    ProductDescription?: string;
    ASIN?: string;
};
export type AdjustmentEvent = {
    AdjustmentType:
    | 'FBAInventoryReimbursement'
    | 'ReserveEvent'
    | 'PostageBilling'
    | 'PostageRefund'
    | 'LostOrDamagedReimbursement'
    | 'CanceledButPickedUpReimbursement'
    | 'ReimbursementClawback'
    | 'SellerRewards';
    AdjustmentAmount: CurrencyAmount;
    AdjustmentItemList: Array<AdjustmentItem>;
    PostedDate: DateTime;
};
export type AffordabilityExpenseEvent = {
    PostedDate?: DateTime;
    TransactionType?: 'Charge' | 'Refund';
    AmazonOrderId?: string;
    BaseExpense?: CurrencyAmount;
    TotalExpense?: CurrencyAmount;
    /* cSpell: disable */
    TaxTypeIGST?: CurrencyAmount;
    TaxTypeCGST?: CurrencyAmount;
    TaxTypeSGST?: CurrencyAmount;
    /* cSpell: enable */
    MarketplaceId?: string;
};
export type AffordabilityExpenseReversalEvent = AffordabilityExpenseEvent;
export type ChargeComponent = {
    ChargeType?:
    | 'Principal'
    | 'Tax'
    | 'MarketplaceFacilitatorTax-Principal'
    | 'MarketplaceFacilitatorTax-Shipping'
    | 'MarketplaceFacilitatorTax-Giftwrap'
    | 'MarketplaceFacilitatorTax-Other'
    | 'Discount'
    | 'TaxDiscount'
    | 'CODItemCharge'
    | 'CODItemTaxCharge'
    | 'CODOrderCharge'
    | 'CODOrderTaxCharge'
    | 'CODShippingCharge'
    | 'CODShippingTaxCharge'
    | 'ShippingCharge'
    | 'ShippingTax'
    | 'Goodwill'
    | 'Giftwrap'
    | 'GiftwrapTax'
    | 'RestockingFee'
    | 'ReturnShipping'
    | 'PointsFee'
    | 'GenericDeduction'
    | 'FreeReplacementReturnShipping'
    | 'PaymentMethodFee'
    | 'ExportCharge'
    | 'SAFE-TReimbursement'
    /* cSpell: disable */
    | 'TCS-CGST'
    | 'TCS-SGST'
    | 'TCS-IGST'
    | 'TCS-UTGST';
    /* cSpell: enable */
    ChargeAmount?: CurrencyAmount;
};
export type ChargeInstrument = {
    Description?: string;
    Tail?: string;
    Amount?: CurrencyAmount;
};
export type CouponPaymentEvent = {
    PostedDate?: DateTime;
    CouponId?: string;
    SellerCouponDescription?: string;
    ClipOrRedemptionCount?: number;
    PaymentEventId?: string;
    FeeComponent?: FeeComponent;
    ChargeComponent?: ChargeComponent;
    TotalAmount?: CurrencyAmount;
};
export type DebtRecoveryEvent = {
    DebtRecoveryType?: 'DebtPayment' | 'DebtPaymentFailure' | 'DebtAdjustment';
    RecoveryAmount?: CurrencyAmount;
    OverPaymentCredit?: CurrencyAmount;
    DebtRecoveryItemList?: Array<DebtRecoveryItem>;
    ChargeInstrumentList?: Array<ChargeInstrument>;
};
export type DebtRecoveryItem = {
    RecoveryAmount?: CurrencyAmount;
    OriginalAmount?: CurrencyAmount;
    GroupBeginDate?: DateTime;
    GroupEndDate?: DateTime;
};
export type DirectPayment = {
    DirectPaymentType?:
    | 'StoredValueCardRevenue'
    | 'StoredValueCardRefund'
    | 'PrivateLabelCreditCardRevenue'
    | 'PrivateLabelCreditCardRefund'
    | 'CollectOnDeliveryRevenue'
    | 'CollectOnDeliveryRefund';
    DirectPaymentAmount?: CurrencyAmount;
};
export type FBALiquidationEvent = {
    PostedDate?: DateTime;
    OriginalRemovalOrderId?: string;
    LiquidationProceedsAmount?: CurrencyAmount;
    LiquidationFeeAmount?: CurrencyAmount;
};
export type FeeComponent = {
    FeeType?: string; // TODO: https://docs.developer.amazonservices.com/en_UK/finances/Finances_FeeTypes.html lists values
    FeeAmount?: CurrencyAmount;
};
export type FinancialEventGroup = {
    FinancialEventGroupId?: string;
    ProcessingStatus?: 'Open' | 'Closed';
    FundTransferStatus?: string;
    OriginalTotal?: CurrencyAmount;
    ConvertedTotal?: CurrencyAmount;
    FundTransferDate?: DateTime;
    TraceId?: string;
    AccountTail?: string;
    BeginningBalance?: CurrencyAmount;
    FinancialEventGroupStart?: DateTime;
    FinancialEventGroupEnd?: DateTime;
};
export type PerformanceBondRefundEvent = {
    // TODO: This is empty in the documentation!
};
export type FinancialEvents = {
    ShipmentEventList?: Array<ShipmentEvent>;
    RefundEventList?: Array<ShipmentEvent>;
    GuaranteeClaimEventList?: Array<ShipmentEvent>;
    ChargebackEventList?: Array<ShipmentEvent>;
    PayWithAmazonEventList?: Array<PayWithAmazonEvent>;
    ServiceProviderCreditEventList?: Array<SolutionProviderCreditEvent>;
    RetrochargeEventList?: Array<RetrochargeEvent>;
    RentalTransactionEventList?: Array<RentalTransactionEvent>;
    PerformanceBondRefundEventList?: Array<PerformanceBondRefundEvent>;
    ProductAdsPaymentEventList?: Array<ProductAdsPaymentEvent>;
    ServiceFeeEventList?: Array<ServiceFeeEvent>;
    DebtRecoveryEventList?: Array<DebtRecoveryEvent>;
    LoanServicingEventList?: Array<LoanServicingEvent>;
    AdjustmentEventList?: Array<AdjustmentEvent>;
    CouponPaymentEventList?: Array<CouponPaymentEvent>;
    SAFETReimbursementEventList?: Array<SAFETReimbursementEvent>;
    SellerReviewEnrollmentPaymentEventList?: Array<SellerReviewEnrollmentPaymentEvent>;
    FBALiquidationEventList?: Array<FBALiquidationEvent>;
    ImagingServicesFeeEventList?: Array<ImagingServicesFeeEvent>;
    AffordabilityExpenseEventList?: Array<AffordabilityExpenseEvent>;
    AffordabilityExpenseReversalEventList?: Array<AffordabilityExpenseReversalEvent>;
    NetworkComminglingTransactionEventList?: Array<NetworkComminglingTransactionEvent>;
    TDSReimbursementEventList?: Array<TDSReimbursementEvent>;
};
export type ImagingServicesFeeEvent = {
    ImagingRequestBillingItemID?: string;
    ASIN?: string;
    PostedDate?: string;
    FeeList?: Array<FeeComponent>
};
export type LoanServicingEvent = {
    LoanAmount?: CurrencyAmount;
    SourceBusinessEventType?: 'LoanAdvance' | 'LoanPayment' | 'LoanRefund';
};
export type NetworkComminglingTransactionEvent = {
    PostedDate?: string;
    NetCoTransactionID?: string;
    SwapReason?: string;
    TransactionType?: 'NetCo' | 'ComminglingVAT';
    ASIN?: string;
    MarketplaceId?: string;
    TaxExclusiveAmount?: CurrencyAmount;
    TaxAmount?: CurrencyAmount;
};
export type PayWithAmazonEvent = {
    SellerOrderId?: string;
    TransactionPostedDate?: string;
    BusinessObjectType?: 'PaymentContract';
    SalesChannel?: string;
    Charge?: ChargeComponent;
    FeeList?: Array<FeeComponent>;
    PaymentAmountType?: 'Sales';
    AmountDescription?: string;
    FulfillmentChannel?: 'AFN' | 'MFN';
    StoreName?: string;
};
export type ProductAdsPaymentEvent = {
    // TODO: documentation shows these camelCased?! is that for real?
    postedDate?: string; // TODO: should dates be a type DateTime ?
    transactionType?: 'charge' | 'refund';
    invoiceId?: string;
    baseValue?: CurrencyAmount;
    taxValue?: CurrencyAmount;
    transactionValue?: CurrencyAmount;
};
export type Promotion = {
    PromotionType?: string;
    PromotionId?: string;
    PromotionAmount?: CurrencyAmount;
};
export type RentalTransactionEvent = {
    AmazonOrderId?: string;
    RentalEventType?:
    | 'RentalCustomerPayment-Buyout'
    | 'RentalCustomerPayment-Extension'
    | 'RentalCustomerRefund-Buyout'
    | 'RentalCustomerRefund-Extension'
    | 'RentalHandlingFee'
    | 'RentalChargeFailureReimbursement'
    | 'RentalLostItemReimbursement';
    ExtensionLength?: number;
    PostedDate?: string;
    RentalChargeList?: Array<ChargeComponent>;
    RentalFeeList?: Array<FeeComponent>;
    MarketplaceName?: string;
    RentalInitialValue?: CurrencyAmount;
    RentalReimbursement?: CurrencyAmount;
    RentalTaxWithheldList?: Array<TaxWithheldComponent>;
};
export type RetrochargeEvent = {
    RetrochargeEventType?: 'Retrocharge' | 'RetrochargeReversal';
    AmazonOrderId?: string;
    PostedDate?: string;
    BaseTax?: CurrencyAmount;
    ShippingTax?: CurrencyAmount;
    MarketplaceName?: string;
    RetrochargeTaxWithheldComponentList?: Array<TaxWithheldComponent>;
};
export type SAFETReimbursementEvent = {
    PostedDate?: string;
    SAFETClaimId?: string;
    ReimbursedAmount?: CurrencyAmount;
    SAFETReimbursementItemList?: Array<SAFETReimbursementItem>;
};
export type SAFETReimbursementItem = {
    ItemChargeList?: Array<ChargeComponent>;
};
export type SellerReviewEnrollmentPaymentEvent = {
    PostedDate?: string;
    EnrollmentId?: string;
    ParentASIN?: string;
    FeeComponent?: FeeComponent;
    ChargeComponent?: ChargeComponent;
    TotalAmount?: CurrencyAmount;
};
export type ServiceFeeEvent = {
    AmazonOrderId?: string;
    FeeReason?: string;
    FeeList?: Array<FeeComponent>;
    SellerSKU?: string;
    FnSKU?: string;
    FeeDescription?: string;
    ASIN?: string;
};
export type ShipmentEvent = {
    AmazonOrderId?: string;
    SellerOrderId?: string;
    MarketplaceName?: string;
    OrderChargeList?: Array<ChargeComponent>;
    OrderChargeAdjustmentList?: Array<ChargeComponent>;
    ShipmentFeeList?: Array<FeeComponent>;
    ShipmentFeeAdjustmentList?: Array<FeeComponent>;
    OrderFeeList?: Array<FeeComponent>;
    OrderFeeAdjustmentList?: Array<FeeComponent>;
    DirectPaymentList?: Array<DirectPayment>;
    PostedDate?: string;
    ShipmentItemList?: Array<ShipmentItem>;
    ShipmentItemAdjustmentList?: Array<ShipmentItem>;
};
export type ShipmentItem = {
    SellerSKU?: string;
    OrderItemId?: string;
    OrderAdjustmentItemId?: string;
    QuantityShipped?: number;
    ItemChargeList?: Array<ChargeComponent>;
    ItemTaxWithheldList?: Array<TaxWithheldComponent>;
    ItemChargeAdjustmentList?: Array<ChargeComponent>;
    ItemFeeList?: Array<FeeComponent>;
    ItemFeeAdjustmentList?: Array<FeeComponent>;
    PromotionList?: Array<Promotion>;
    PromotionAdjustmentList?: Array<Promotion>;
    CostOfPointsGenerated?: CurrencyAmount;
    CostOfPointsReturned?: CurrencyAmount;
};
export type SolutionProviderCreditEvent = {
    ProviderTransactionType?: 'ProviderCredit' | 'ProviderCreditReversal';
    SellerOrderId?: string;
    MarketplaceId?: string;
    MarketplaceCountryCode?: string;
    SellerId?: string;
    SellerStoreName?: string;
    ProviderId?: string;
    ProviderStoreName?: string;
};
export type TDSReimbursementEvent = {
    PostedDate?: string;
    TdsOrderId?: string;
    ReimbursedAmount?: CurrencyAmount;
};
export type TaxWithheldComponent = {
    TaxCollectionModel?: 'MarketplaceFacilitator' | 'Standard';
    TaxesWithheld?: Array<ChargeComponent>;
};