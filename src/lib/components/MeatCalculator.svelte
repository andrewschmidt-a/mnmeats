<script lang=ts>
    import Beef from '$lib/assets/Beef.png'
    import WalmartLogo from '$lib/assets/walmart-logo.svg'
    import {type Cut, type CutPrice, type CutPriceMap} from './meat.types'
    import { Icon, GlobeAlt, CheckCircle, XCircle } from "svelte-hero-icons";


    import BeefCuts from './meatcuts'
    import BeefPrices from './meatprices'

    let selectedOption = $state("")

    let getLabel = (cut: Cut) => {
        let label = "";

        if(cut.quantityLow){
            label += cut.quantityLow
        }
        if(cut.quantityHigh && cut.quantityHigh != cut.quantityLow){
            label += "-"+cut.quantityHigh
        }
        if(cut.quantityLow){
            label += " "
        }
        label += cut.label

        return label;
    }
    let getPriceWeight: (cut: Cut) => {low: number, high: number, weightHigh: number, weightLow: number} = (cut: Cut) => {
        return {
            low: (cut.quantityLow??1)*BeefPrices[cut.id].price,
            high: (cut.quantityHigh??1)*BeefPrices[cut.id].price,
            weightHigh: (cut.quantityHigh??1)*BeefPrices[cut.id].weight,
            weightLow: (cut.quantityLow??1)*BeefPrices[cut.id].weight
        }
    }
    let selectedOptionObject = $derived(BeefCuts.filter(t=>t.id == selectedOption)?.[0])
    let selectedCuts = $derived.by(()=>{
        if(!selectedOption || selectedOption == "")
        {
            return undefined;
        }
        return (selectedOptionObject?.cuts??[]).filter(t=>includeOrgans || !t.organMeat).map(cut => {
            let priceWeight = getPriceWeight(cut);
            return {
                label: getLabel(cut),
                low: priceWeight.low,
                high: priceWeight.high,
                link: BeefPrices[cut.id].link,
                weightHigh: priceWeight.weightHigh,
                weightLow: priceWeight.weightLow
            }
        })
    })
    let includeOrgans = $state(true)
</script>

<div class="grid grid-cols-12 gap-4 ">
    <!-- <div class="col-span-12">
        <img class="w-full" src={Beef} alt="Chart of beef cuts"></div> -->
    <div class="col-span-12 sm:col-span-10">
        <label for="cutCow" class="label ">
            <span class="label-text">I want to buy...</span>
        </label>
        <select id="cutCow" class="select select-bordered w-full" bind:value={selectedOption}>
            <option value="" disabled selected>Select an option</option>
            <option value="frontquarter">Front quarter</option>
            <option value="hindquarter">Hind quarter</option>
            <option value="halfbeef">Half beef</option>
            <option value="wholebeef">Whole beef</option>
        </select>
    </div>
    <div class="col-span-12 sm:col-span-2">
        <label for="includeOrgans" class="label ">
            <span class="label-text">Include organs</span>
        </label>
        <select id="includeOrgans" class="select select-bordered w-full" bind:value={includeOrgans}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
        </select>
    </div>
    {#if selectedCuts}
    <div class="col-span-12 md:col-span-6">
        <h1 class="text-2xl text-center">Overview</h1>
        <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <tr class="">
                  <th></th>
                  <th>Farm</th>
                  <th>Store</th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr>
                  <th>Cost (low)</th>
                  <td>$ {((selectedOptionObject.weightLow??0)*(selectedOptionObject.price??0)).toFixed(2)} <br/>$ {((selectedOptionObject.weightLow??0)*(selectedOptionObject.price??0)/4).toFixed(2)}/mo for 4 months*</td>
                  <td>$ {selectedCuts.map(t=>t.low).reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Cost (high)</th>
                  <td>$ {((selectedOptionObject.weightHigh??0)*(selectedOptionObject.price??0)).toFixed(2)}<br/>$ {((selectedOptionObject.weightHigh??0)*(selectedOptionObject.price??0)/4).toFixed(2)}/mo for 4 months*</td>
                  <td>$ {selectedCuts.map(t=>t.high).reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{selectedOptionObject.weightLow} - {selectedOptionObject.weightHigh} lbs</td>
                  <td>{selectedCuts.map(t=>t.weightLow).reduce((partialSum, a) => partialSum + a, 0).toFixed(0)} - {selectedCuts.map(t=>t.weightHigh).reduce((partialSum, a) => partialSum + a, 0).toFixed(0)} lbs</td>
                </tr>
                <!-- row 2 -->
                <tr>
                    <th>Fresh</th>
                    <td><Icon src={CheckCircle} width=24px solid class="text-success" /></td>
                    <td><Icon src={XCircle} width=24px solid class="text-error" /></td>
                  </tr>
                <tr>
                  <th>Additive free</th>
                  <td><Icon src={CheckCircle} width=24px solid class="text-success" /></td>
                  <td><Icon src={XCircle} width=24px solid class="text-error" /></td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <th>Supports local farms</th>
                  <td><Icon src={CheckCircle} width=24px solid class="text-success" /></td>
                  <td><Icon src={XCircle} width=24px solid class="text-error" /></td>
                </tr>
                <tr>
                    <th>Custom cuts</th>
                    <td><Icon src={CheckCircle} width=24px solid class="text-success" /></td>
                    <td><Icon src={XCircle} width=24px solid class="text-error" /></td>
                  </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Required freezer space</strong>: {selectedOptionObject.freezerSpace}</p>
          <p>NOTE: This is only an estimate, hanging weight varies and the yield of meat depends on the cuts ordered</p>
          <p>*0% interest with any payment, if paid back in 4 months.</p>
    </div>
    <div class="col-span-12 md:col-span-6">
        <h1 class="text-2xl text-center">Details</h1>
        <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <tr class="">
                  <th></th>
                  <th>Price (low)</th>
                  <th>Price (high)</th>
                  <th>Compare At</th>
                </tr>
              </thead>
              <tbody>
                    {#each selectedCuts as cut}
                        <tr>
                            <th>{cut.label}</th>
                            <td>{cut.low.toFixed(2)}</td>
                            <td>{cut.high.toFixed(2)}</td>
                            <td>
                                <a href={cut.link} target="_blank">
                                    {#if cut.link.includes("walmart.com")}
                                        <img width=24px height="24px" src={WalmartLogo} alt="Walmart link to compare prices">
                                    {:else}
                                        <Icon src={GlobeAlt} width=24px solid />
                                    {/if}
                                </a>
                            </td>
                        </tr>
                    {/each}
                <tr class="border-top">
                    <th>Total</th>
                    <td class="font-bold border-top">{selectedCuts.map(t=>t.low).reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</td>
                    <td class="font-bold">{selectedCuts.map(t=>t.high).reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}</td>
                    <td>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
    {/if}
</div>

<style>
    tr.border-top td, tr.border-top th{
        border-top: 1px solid;
    }
</style>