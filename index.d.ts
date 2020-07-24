export type DateTime = string;
// https://docs.developer.amazonservices.com/en_UK/easy_ship/EasyShip_Datatypes.html
export type Dimensions = {
    // Dimensions is also defined in FBA Inbound.
    Length: number;
    Width: number;
    Height: number;
    Unit: 'cm' | 'inches' | 'centimeters'; // cm in EasyShip, inches and centimeters in FBA Inbound
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
    // Weight is also defined in FBA Inbound.
    Value: number;
    Unit: 'g' | 'pounds' | 'kilograms'; // 'g' in EasyShip, pounds and kilograms in FBA Inbound
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
    PostedDate?: DateTime;
    FeeList?: Array<FeeComponent>
};
export type LoanServicingEvent = {
    LoanAmount?: CurrencyAmount;
    SourceBusinessEventType?: 'LoanAdvance' | 'LoanPayment' | 'LoanRefund';
};
export type NetworkComminglingTransactionEvent = {
    PostedDate?: DateTime;
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
    TransactionPostedDate?: DateTime;
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
    postedDate?: DateTime;
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
    PostedDate?: DateTime;
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
    PostedDate?: DateTime;
    BaseTax?: CurrencyAmount;
    ShippingTax?: CurrencyAmount;
    MarketplaceName?: string;
    RetrochargeTaxWithheldComponentList?: Array<TaxWithheldComponent>;
};
export type SAFETReimbursementEvent = {
    PostedDate?: DateTime;
    SAFETClaimId?: string;
    ReimbursedAmount?: CurrencyAmount;
    SAFETReimbursementItemList?: Array<SAFETReimbursementItem>;
};
export type SAFETReimbursementItem = {
    ItemChargeList?: Array<ChargeComponent>;
};
export type SellerReviewEnrollmentPaymentEvent = {
    PostedDate?: DateTime;
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
    PostedDate?: DateTime;
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
    PostedDate?: DateTime;
    TdsOrderId?: string;
    ReimbursedAmount?: CurrencyAmount;
};
export type TaxWithheldComponent = {
    TaxCollectionModel?: 'MarketplaceFacilitator' | 'Standard';
    TaxesWithheld?: Array<ChargeComponent>;
};

// https://docs.developer.amazonservices.com/en_UK/fba_inbound/FBAInbound_Datatypes.html
export type Address = {
    Name: string; // max 50 char
    AddressLine1: string; // max 180 char
    AddressLine2?: string; // max 60 char
    City: string; // max 30 char
    DistrictOrCounty?: string; // max 25 char
    StateOrProvinceCode?: string; // max 2 char
    CountryCode: string; // max 2 char, ISO-3166-1 alpha-2
    PostalCode?: string; // max 30 char
};
export type PrepInstruction = 'Polybagging' | 'BubbleWrapping' | 'Taping' | 'BlackShrinkWrapping' | 'Labeling' | 'HangGarment';
export type Amount = {
    CurrencyCode: 'USD' | 'GBP';
    Value: string;
};
export type AmazonPrepFeesDetails = {
    PrepInstruction: PrepInstruction;
    FeePerUnit: Amount;
};
export type InboundGuidance = 'InboundNotRecommended' | 'InboundOK';
export type GuidanceReason = 'SlowMovingASIN' | 'NoApplicableGuidance';
export type ASINInboundGuidance = {
    ASIN: string;
    InboundGuidance: InboundGuidance;
    GuidanceReasonList?: Array<GuidanceReason>;
};
export type ASINPrepInstructions = {
    // TODO: documentation does not have a "Required" field as most do
    ASIN: string;
    BarcodeInstruction?: 'RequiresFNSKULabel' | 'MustProvideSellerSKU';
    PrepGuidance: 'ConsultHelpDocuments' | 'NoAdditionalPrepRequired' | 'SeePrepInstructionsList';
    PrepInstructionList?: Array<PrepInstruction>;
};
export type BoxContentsFeeDetails = {
    TotalUnits?: number;
    FeePerUnit?: Amount;
    TotalFee?: Amount;
};
export type BoxContentsSource = 'NONE' | 'FEED' | '2D_BARCODE' | 'INTERACTIVE';
export type Contact = {
    Name: string; // 50 char
    Phone: string; // 20 char
    Email: string; // 50 char
    Fax: string; // 20 char
};
export type InboundShipmentHeader = {
    ShipmentName: string;
    ShipFromAddress: Address;
    DestinationFulfillmentCenterId: string;
    LabelPrepPreference: 'SELLER_LABEL' | 'AMAZON_LABEL_ONLY' | 'AMAZON_LABEL_PREFERRED';
    AreCasesRequired?: boolean; // TODO: should this be a string true | false ?
    ShipmentStatus: 'WORKING' | 'SHIPPED' | 'CANCELLED';
    IntendedBoxContentsSource?: BoxContentsSource;
};
export type InboundShipmentInfo = {
    ShipmentId?: string;
    ShipmentName?: string;
    ShipFromAddress: Address;
    DestinationFulfillmentCenterId?: string;
    LabelPrepType?: 'NO_LABEL' | 'SELLER_LABEL' | 'AMAZON_LABEL';
    ShipmentStatus?: 'WORKING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED' | 'CANCELLED' | 'DELETED' | 'ERROR';
    AreCasesRequired: boolean; // TODO: should this be a string true | false ?
    ConfirmedNeedByDate?: string; // YYYY-MM-DD, only valid in India and Japan
    BoxContentsSource?: BoxContentsSource;
    EstimatedBoxContentsFee?: BoxContentsFeeDetails;
};
export type InboundShipmentItem = {
    ShipmentId?: string;
    SellerSKU: string;
    FulfillmentNetworkSKU?: string;
    QuantityShipped: number;
    QuantityReceived?: number;
    QuantityInCase?: number;
    PrepDetailsList?: Array<PrepDetails>;
    ReleaseDate?: string // YYYY-MM-DD
};
export type InboundShipmentPlan = {
    ShipmentId: string;
    DestinationFulfillmentCenterId: string;
    ShipToAddress: Address;
    LabelPrepType: 'NO_LABEL' | 'SELLER_LABEL' | 'AMAZON_LABEL'; // TODO: this sequence is used in multiple places, combine them into a single type
    Items: InboundShipmentPlanItem;
    EstimatedBoxContentsFee?: BoxContentsFeeDetails;
};
export type InboundShipmentPlanItem = {
    SellerSKU: string;
    FulfillmentNetworkSKU: string;
    Quantity: number;
    PrepDetailsList?: Array<PrepDetails>;
};
export type InboundShipmentPlanRequestItem = {
    SellerSKU: string;
    ASIN?: string;
    Condition?:
    | 'NewItem'
    | 'NewWithWarranty'
    | 'NewOEM'
    | 'NewOpenBox'
    | 'UsedLikeNew'
    | 'UsedVeryGood'
    | 'UsedGood'
    | 'UsedAcceptable'
    | 'UsedPoor'
    | 'UsedRefurbished'
    | 'CollectibleLikeNew'
    | 'CollectibleVeryGood'
    | 'CollectibleGood'
    | 'CollectibleAcceptable'
    | 'CollectiblePoor'
    | 'RefurbishedWithWarranty'
    | 'Refurbished'
    | 'Club';
    Quantity: number;
    QuantityInCase?: number;
    PrepDetailsList?: Array<PrepDetails>;
};
export type InvalidASIN = {
    ASIN: string;
    ErrorReason: 'DoestNotExist';
};
export type InvalidSKU = {
    SellerSKU: string;
    ErrorReason: 'DoesNotExist';
};
export type NonPartneredLtlDataInput = {
    CarrierName:
    // UK
    | 'BUSINESS_POST'
    | 'DHL_AIRWAYS_INC'
    | 'DHL_UK'
    | 'PARCELFORCE'
    | 'DPD'
    | 'TNT_LOGISTICS_CORPORATION'
    | 'TNT'
    | 'YODEL'
    | 'UNITED_PARCEL_SERVICE_INC' // UK & US
    | 'OTHER' // UK & US
    // US
    | 'DHL_EXPRESS_USA_INC'
    | 'FEDERAL_EXPRESS_CORP'
    | 'UNITED_STATES_POSTAL_SERVICE';
    ProNumber: string; // max 10
};
export type NonPartneredLtlDataOutput = NonPartneredLtlDataInput;
export type NonPartneredSmallParcelDataInput = {
    CarrierName: // TODO: this is duplicated, make it a separate type?
    // UK
    | 'BUSINESS_POST'
    | 'DHL_AIRWAYS_INC'
    | 'DHL_UK'
    | 'PARCELFORCE'
    | 'DPD'
    | 'TNT_LOGISTICS_CORPORATION'
    | 'TNT'
    | 'YODEL'
    | 'UNITED_PARCEL_SERVICE_INC' // UK & US
    | 'OTHER' // UK & US
    // US
    | 'DHL_EXPRESS_USA_INC'
    | 'FEDERAL_EXPRESS_CORP'
    | 'UNITED_STATES_POSTAL_SERVICE';
    PackageList: Array<NonPartneredSmallParcelPackageInput>;
};
export type NonPartneredSmallParcelDataOutput = {
    PackageList: Array<NonPartneredSmallParcelPackageOutput>;
};
export type NonPartneredSmallParcelPackageInput = {
    TrackingId: string; // 30
};
export type NonPartneredSmallParcelPackageOutput = {
    CarrierName:
    // UK
    | 'BUSINESS_POST'
    | 'DHL_AIRWAYS_INC'
    | 'DHL_UK'
    | 'PARCELFORCE'
    | 'DPD'
    | 'TNT_LOGISTICS_CORPORATION'
    | 'TNT'
    | 'YODEL'
    | 'UNITED_PARCEL_SERVICE_INC' // UK & US
    | 'OTHER' // UK & US
    // US
    | 'DHL_EXPRESS_USA_INC'
    | 'FEDERAL_EXPRESS_CORP'
    | 'UNITED_STATES_POSTAL_SERVICE';
    TrackingId: string; // 30
    PackageStatus: 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED';
};
export type Pallet = {
    Dimensions: Dimensions;
    Weight?: Weight;
    IsStacked: boolean; // TODO: should this be a string true | false
};
export type PartneredEstimate = {
    Amount?: Amount;
    ConfirmDeadline?: DateTime;
    VoidDeadline?: DateTime;
};
type FreightClass = '50' | '55' | '60' | '65' | '70' | '77.5' | '85' | '92.5' | '100' | '110' | '125' | '150' | '175' | '200' | '250' | '300' | '400' | '500';
export interface PartneredLtlDataInput {
    Contact: Contact;
    BoxCount: number;
    SellerFreightClass?: FreightClass;
    FreightReadyDate: string; // YYYY-MM-DD
    PalletList?: Array<Pallet>;
    TotalWeight?: Weight;
    SellerDeclaredValue?: Amount;
}
export interface PartneredLtlDataOutput extends PartneredLtlDataInput {
    AmazonCalculatedValue?: Amount;
    PreviewPickupDate: DateTime;
    PreviewDeliveryDate: DateTime;
    PreviewFreightClass: FreightClass;
    AmazonReferenceId: string;
    IsBillOfLadingAvailable: boolean; // TODO: should this be a string true | false
    PartneredEstimate: PartneredEstimate;
    CarrierName: // US carriers only?
    | 'DHL_EXPRESS_USA_INC'
    | 'FEDERAL_EXPRESS_CORP'
    | 'UNITED_STATES_POSTAL_SERVICE'
    | 'UNITED_PARCEL_SERVICE_INC'
    | 'OTHER';
}
export type PartneredSmallParcelDataInput = {
    CarrierName?:
    | 'UNITED_PARCEL_SERVICE_INC' // FR, IT, ES, UK, US, DE
    | 'DHL_STANDARD'; // DE
    PackageList: Array<PartneredSmallParcelPackageInput>;
};
export type PartneredSmallParcelDataOutput = {
    PackageList: Array<PartneredSmallParcelPackageOutput>;
    PartneredEstimate?: PartneredEstimate;
};
export type PartneredSmallParcelPackageInput = {
    Dimensions: Dimensions;
    Weight: Weight;
};
export type PartneredSmallParcelPackageOutput = {
    Dimensions: Dimensions;
    Weight: Weight;
    TrackingId: string; // 30
    PackageStatus: 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED';
    CarrierName: string;
};
export type PrepDetails = {
    PrepInstruction: PrepInstruction;
    PrepOwner: 'AMAZON' | 'SELLER';
};
export type SKUInboundGuidance = {
    SellerSKU: string;
    ASIN: string;
    InboundGuidance: InboundGuidance;
    GuidanceReasonList?: Array<GuidanceReason>;
};
export type SKUPrepInstructions = {
    // TODO: this one does not have an optional field in docs
    SellerSKU: string;
    ASIN: string;
    BarcodeInstruction: 'RequiresFNSKULabel' | 'CanUseOriginalBarcode';
    PrepGuidance: 'ConsultHelpDocuments' |'NoAdditionalPrepRequired' | 'SeePrepInstructionsList';
    PrepInstructionList?: Array<PrepInstruction>;
    AmazonPrepFeesDetails: Array<AmazonPrepFeesDetails>;
};
export type TransportContent = {
    TransportHeader: TransportHeader;
    TransportDetails: TransportDetailOutput;
    TransportResult: TransportResult;
};
export type TransportDetailInput = {
    PartneredSmallParcelData?: PartneredSmallParcelDataInput;
    NonPartneredSmallParcelData?: NonPartneredSmallParcelDataInput;
    PartneredLtlData?: PartneredLtlDataInput;
    NonPartneredLtlData?: NonPartneredLtlDataInput;
};
export type TransportDetailOutput = {
    PartneredSmallParcelData?: PartneredSmallParcelDataOutput;
    NonPartneredSmallParcelData?: NonPartneredSmallParcelDataOutput;
    PartneredLtlData?: PartneredLtlDataOutput;
    NonPartneredLtlData?: NonPartneredLtlDataOutput;
};
export type TransportDocument = {
    PdfDocument: string;
    Checksum: string;
};
export type TransportHeader = {
    SellerId: string;
    ShipmentId: string;
    IsPartnered: boolean; // TODO: true | false ?
    ShipmentType: 'SP' | 'LTL';
};
export type TransportResult = {
    TransportStatus:
    | 'WORKING'
    | 'ERROR_ON_ESTIMATING'
    | 'ESTIMATING'
    | 'ESTIMATED'
    | 'ERROR_ON_CONFIRMING'
    | 'CONFIRMING'
    | 'CONFIRMED'
    | 'VOIDING'
    | 'VOIDED'
    | 'ERROR_IN_VOIDING';
};

// https://docs.developer.amazonservices.com/en_UK/fba_inventory/FBAInventory_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/fba_outbound/FBAOutbound_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/merch_fulfill/MerchFulfill_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/orders-2013-09-01/Orders_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/products/Products_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/recommendations/Recommendations_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/reports/Reports_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/sellers/Sellers_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/shipment_invoicing/ShipmentInvoicing_Datatypes.html

// https://docs.developer.amazonservices.com/en_UK/subscriptions/Subscriptions_Datatypes.html