export enum FilterKeys {
    LEAD_ID ='_id',
    LEAD_DATE = 'leadDate',
    STATUS = 'leadStatus',
    PLAN = 'plan',
    ANNUAL_SPENT = 'annualSpend',
    COMPANY = 'companyName'
}

export const PlanLabel ={
    BASIC :'Travel Lite',
    PRO : 'Travel Pro',
    ELITE: 'Travel Elite'
}

export const FILTERS_DATA = [
    {
      type:'date-range',
      filterKey: FilterKeys.LEAD_DATE,
      placeholder:'Lead Date'
    },
    {
      placeholder:'Annual Spent',
      type:'select',
      filterKey: FilterKeys.ANNUAL_SPENT,
      options:[
        {
          label:'Less than ₹10 Lac',
          value:'Less than ₹10 Lac'
        },
        {
          label:'₹10 Lac - ₹25 Lac',
          value:'₹10 Lac - ₹25 Lac'
        },
        {
          label:'₹25 Lac - ₹1 Cr',
          value:'₹25 Lac - ₹1 Cr'
        },
        {
          label:'₹1 Cr - ₹2 Cr',
          value:'₹1 Cr - ₹2 Cr'
        },
        {
          label:'₹2 Cr - ₹5 Cr',
          value:'₹2 Cr - ₹5 Cr'
        },
        {
          label:'More than ₹5 Cr',
          value:'More than ₹5 Cr'
        }
      ]
    },
    {
      placeholder: "Plan",
      type:'select',
      filterKey: FilterKeys.PLAN,
      options:[
        {
          label:'Travel Lite',
          value:'BASIC',
          description:'Small Size Businesses'
        },
        {
          label:'Travel Pro',
          value:'PRO',
          description:'Medium Size Businesses'
        },
        {
          label:'Travel Elite',
          value:'ELITE',
          description:'Large Businesses'
        }
      ]
    },
    {
      placeholder: "Lead Status",
      type:'select',
      filterKey : FilterKeys.STATUS,
      options:[
        {
          label:'Failed',
          value:'FAILED'
        },
        {
          label:'To be Picked',
          value:'TO_BE_PICKED',
          description:''
        },
        {
          label:'Picked',
          value:'PICKED',
        },
        {
          label:'Converted',
          value:'CONVERTED'
        }
        
      ]
    }
  ]