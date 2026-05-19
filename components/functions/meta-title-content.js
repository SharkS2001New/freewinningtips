import { useRouter } from 'next/router';
import { parseCountrySegment, parseLeagueSlug } from '@/components/functions/leagueUrl';

function MetaContent() {
    let title = "";
    let meta_desc_content ="";
    let meta_keywords = "";
    let page_title= "";

    var meta_content_array = [];

    const router = useRouter();

    var current_url = router.pathname.substring(1);
    
    //url value being passed on page each page load
    if(current_url == "tomorrows-free-football-predictions"){

        title ="Tomorrow Free Football Predictions";
        meta_desc_content = "Get tomorrow football predictions from experts for free. Our platform covers all leagues and are distributed across all available and popular bet types";
        meta_keywords = "tomorrow prediction, tomorrow football predictions, tomorrow soccer prediction, tomorrow football matches, football fixtures tomorrow, tomorrow matches predictions, football tomorrow, correct score tomorrow";
        page_title = "Football Predictions Tomorrow";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
        
    } else if(current_url == "yesterdays-free-football-predictions"){

        title ="Yesterday Football Predictions and Results";
        meta_desc_content = "Get yesterday football predictions for free on FreeWinningTips. We offer a wide range of results that help you make the best decision on all upcoming fixtures";
        meta_keywords = "yesterday football predictions,football predictions yesterday, yesterday soccer predictions, yesterday matches predictions, yesterday games predictions, yesterday football results, yesterday predictions, correct score, correct score yesterday";
        page_title = "Football Predictions and Results for Yesterday";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(current_url == "free-vip-tips-today"){

        title ="Free VIP Tips | Daily VIP Tips Prediction";
        meta_desc_content = "Get Free VIP tips today prediction well analyzed by Experts on FreeWinningTips. We provide winning tips daily to help you consistently make profit after profit";
        meta_keywords = "betting tips vip daily prediction apk, daily vip tips prediction, football tips, football betting tips, free vip tips today, vip tips, winning tips today, vip betting tips";
        page_title = "Free VIP Football Prediction";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    } else if(current_url == "jackpot-predictions"){

        title ="All Jackpot Predictions On FreeWinnigTips";
        meta_desc_content = "Get the best tips and predictions for hitting the jackpot. Increase your chances of winning big with our reliable and easy-to-follow strategies.";
        meta_keywords = "jackpot prediction, Jackpot predictions, all jackpot predictions, jackpot today, accurate  jackpot predictions, free  jackpot prediction, today's jackpot predictions ";
        page_title = "Jackpot Prediction: Win Big Every Time";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    } else if(current_url == "tipster-tips"){

        title ="Best Tipster Predictions Today";
        meta_desc_content = "FreeWinningTips is now the home to the best tipster prediction around the world. Join us now, enjoy our tipster predictions, and begin your winning journey";
        meta_keywords = "tipster prediction,tipster predictions, tipster predictions today, top tipster predictions, tipster predictions today games, tipster tips, tipsters 1x2,tipster competition,best tipster prediction";
        page_title = "Top Tipster Predictions, Today Games";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(current_url == "tip-of-the-day"){

        title ="Best Professional tip of the day";
        meta_desc_content = "Unlock daily victories with FreeWinningTips analyzed Banker Tip of the Day. Trust our experts for 100% accurate free predictions, and start winning every day";
        meta_keywords = "tip of the day, best tip of the day, banker tip of the day, professional tip of the day,single tip of the day,free tip of the day,match of the day prediction,game of the day, free game of the day"
        page_title = "Free Tip of the day";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    } else if(current_url == "payment-methods"){

        title ="FreeWinningTips Secure and Convenient Payment Methods";
        meta_desc_content = "Free Winning Tips Secure and Convenient Payment Methods for Specified Countries";
        meta_keywords = "FreeWinningTips payment methods,  FreeWinningTips tips payment, FreeWinningTips prediction payment, secure payment for FreeWinningTips, convenient payment for FreeWinningTips, pay for FreeWinningTips tips, pay for FreeWinningTips prediction";
        page_title = "Our Payment Methods - FreeWinningTips";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    } else if(current_url == "sitemaps"){

        title = "FreeWinningTips Sitemap Links";                        
        meta_desc_content = "FreeWinningTips Sitemap Links";
        meta_keywords = "FreeWinningTips, FreeWinningTips Sitemap Links";
        page_title = "Sitemap Links";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    } else if(current_url == "our-terms-and-conditions"){

        title = "FreeWinningTips Terms and Conditions";
        meta_desc_content = "FreeWinningTips Terms and Conditions";
        meta_keywords = "FreeWinningTips Terms and Conditions";
        page_title = "Terms and Conditions";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    } else if(current_url == "our-privacy-policy"){

        title = "Privacy Policy for FreeWinningTips";
        meta_desc_content = "Privacy Policy for FreeWinningTips";
        meta_keywords = "Privacy Policy for FreeWinningTips";
        page_title = "Privacy Policy for FreeWinningTips";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title); 
    } else if(current_url == "contact-us"){

        title = "Contact us FreeWinningTips";
        meta_desc_content = "Contact us FreeWinningTips";
        meta_keywords = "Contact us FreeWinningTips";
        page_title = "Contact us";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(current_url == "our-partners"){

            title = "Our Partners - FreeWinningTips";
            meta_desc_content = "Our Partners - FreeWinningTips";
            meta_keywords = "Our Partners - FreeWinningTips";
            page_title = "Our Partners";
    
            meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(current_url == "about-us"){

        title = "About FreeWinningTips";
        meta_desc_content = "About FreeWinningTips";
        meta_keywords = "About FreeWinningTips";
        page_title = "About us";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/1-5-goals"){

        title ="FreeWinningTips – Over 1.5 Goals Predictions";
        meta_desc_content = "Get the most accurate Over 1.5 goals predictions to win big. Make the most of your bets with our expert analysis of high-scoring games.";
        meta_keywords = "over 1.5, over 1.5 goals, goals over 1.5 predictions";
        page_title = "Best Over 1.5 Goals Tips on FreeWinningTips";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/2-5-goals"){

        title ="Over 2.5 Goals Predictions – Win Big";
        meta_desc_content = "Get accurate Over 2.5 goals predictions for today's matches. Our tips provide the edge you need for successful bets on high-scoring games.";
        meta_keywords = "over 2.5, over 2.5 goals, goals over 2.5 predictions";
        page_title = "Over 2.5 Goals – Expert Tips for High-Scoring Matches";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
 
    } else if(router.asPath.substring(1) == "predictions/3-5-goals"){

        title ="Over 3.5 & Under 3.5 Goals Predictions";
        meta_desc_content = "Get the best Over 3.5 & Under 3.5 goals predictions. Our expert tips help you choose wisely on matches with high or low-scoring potentials.";
        meta_keywords = "over 3.5, over 3.5 goals, goals over 3.5 predictions, under 3.5, under 3";
        page_title = "Over 3.5 & Under 3.5 Goals Tips";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
        
    } else if(router.pathname.substring(1) == "jackpots/sportpesa-midweek-jackpot-predictions"){
        title ="Sportpesa Midweek Jackpot Prediction This week";
        meta_desc_content = "Get Sportpesa Midweek Jackpot Prediction at no cost and stand a chance to win a prize of 11 Million. We offer reliable tips accessible to all customers for free";
        meta_keywords = "sportpesa midweek jackpot,sportpesa midweek jackpot prediction today,sportpesa midweek jackpot predictions,cheerplex sportpesa midweek jackpot prediction today,venas sportpesa midweek jackpot prediction,sportpesa midweek jackpot bonus,sportpesa midweek prediction,sportpesa midweek jackpot games today, sportpesa midweek jackpot prediction this week, sportpesa midweek jackpot correct prediction";
        page_title = "Sportpesa Midweek Jackpot Predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.pathname.substring(1) == "jackpots/mozzart-bet-grand-jackpot-predictions"){
        title ="Mozzart Bet Super Grand Jackpot Prediction and Bonuses";
        meta_desc_content = "Mozzart Super Grand Jackpot Prediction - Get free Mozzart Bet Jackpot Predictions tips today and stand a chance to win KES 200M Jackpot Prize or Bonuses";
        meta_keywords = "mozzart jackpot prediction,mozzart bet jackpot prediction,mozzart jackpot bonus,mozzart jackpot today predictions,cheerplex mozzart jackpot prediction today, venas mozzart jackpot prediction today, mozzart bet super grand jackpot prediction, mozzart super grand jackpot prediction,mozzart mega jackpot prediction, mozzart bet jackpot prediction today, taifa mozzart jackpot prediction,mozzart mega jackpot bonuses";
        page_title = "Mozzart Bet Super Grand Jackpot Prediction Today";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
        
    } else if(router.pathname.substring(1) == "jackpots/odibet-laki-tatu-jackpot-predictions"){
        title ="Odibet Laki Tatu Jackpot & Bonus Predictions";
        meta_desc_content = "FreeWinningTips offers Odibet Laki Tatu Jackpot Predictions Games for free. Visit us for reliable tips & win the Jackpot bonus using an affordable stake amount";
        meta_keywords = "Odibet Laki Tatu Jackpot predictions, odibet laki tatu jackpot games, odibet laki tatu jackpot bonus, Odibet Laki Tatu Daily Jackpot Stake Amount";
        page_title = "Odibet Laki Tatu Jackpot predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/shabiki-midweek-jackpot-predictions"){
        title ="Shabiki Jackpot Predictions & Bonuses";
        meta_desc_content = "Are you looking for Shabiki Midweek Jackpot Prediction? FreeWinningTips provides Jackpot Mbao predictions for Today. Get our premium tips and win a bonus";
        meta_keywords = "shabiki jackpot, shabiki jackpot mbao, shabiki jackpot prediction,shabiki jackpot predictions,shabiki jackpot 13 predictions,cheerplex shabiki jackpot prediction,shabiki jackpot prediction today,shabiki jackpot games this weekend,shabiki jackpot predictions today, shabiki midweek jackpot prediction,shabiki jackpot bonuses,shabiki jackpot mbao bonus";
        page_title = "Shabiki Midweek Jackpot Prediction";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/mozzart-super-daily-jackpot-predictions"){
        title ="Mozzart Super Daily Jackpot Prediction";
        meta_desc_content = "Mozzart Daily Jackpot Prediction - Get 100 Accurate Jackpot Predictions for Free from a reliable partner and stand a chance to claim your Bonus Today";
        meta_keywords = "mozzart daily jackpot prediction, mozzart daily jackpot predictions, mozzart daily jackpot, mozzart daily jackpot bonus, 100 accurate mozzart daily jackpot prediction, mozzart daily jackpot bonus yesterday, mozzart super daily jackpot prediction, mozzart daily jackpot rules, mozzart daily jackpot results, mozzartbet daily jackpot prediction";
        page_title = "Mozzart Daily Jackpot Prediction";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/betlion-daily-jackpot-predictions"){
        title ="Betlion Prediction";
        meta_desc_content = "Get Betlion Jackpot prediction for free from FreeWinningTips. Our focus is to help you win a bonus or Jackpot Prize";
        meta_keywords = "betlion, betlion jackpot, betlion free bet, betlion daily jackpot, betlion prediction, betlion daily jackpot prediction";
        page_title = "Betlion Jackpot Prediction";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/betika-kitonga-tanzania-predictions"){
        title ="Betika Kitonga TZ Jackpot Predictions & Bonuses";
        meta_desc_content = "Betika Jackpot Tanzania Games are now given free of charge on FreeWinningTips. Catch daily updates and stand a chance to win Stake Prizes and Bonuses";
        meta_keywords = "Betika Jackpot Tanzania,Predictions Today, Betika Jackpot Tanzania Bonuses,Betika Jackpot Predictions Tanzania, Betika Tanzania Jackpot Stake Prize, Betika Jackpot Tanzania Games";
        page_title = "Betika Kitonga Jackpot Predictions Tanzania";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/1xbet-toto-15-jackpot-predictions"){
        title ="1XBet Toto 15 Jackpot Predictions & Bonuses";
        meta_desc_content = "Get 1XBet Toto 15 Jackpot Predictions from a trusted partner. We follow all toto Jackpot rules to ensure we offer Correct Score tips to help you win bonuses";
        meta_keywords = "1XBet Toto 15 Jackpot Predictions, 1xbet toto 15 jackpot rules, 1xbet toto 15 jackpot bonuses, 1xbet toto correct score";
        page_title = "1XBet Toto 15 Jackpot Predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/sportpesa-midweek-tanzania-jackpot-predictions"){
        title ="Sportpesa Midweek TZ Jackpot Predictions - Tanzania";
        meta_desc_content = "Get free Sportpesa Midweek Tanzania TZ Jackpot Prediction from a reliable partner. We help you win the Rafiki Bonuses Promotion for Today and this Week";
        meta_keywords = "sportpesa midweek jackpot,sportpesa midweek jackpot prediction today,sportpesa midweek jackpot predictions,cheerplex sportpesa midweek jackpot prediction today,venas sportpesa midweek jackpot prediction,sportpesa midweek jackpot bonus,sportpesa midweek prediction,sportpesa midweek jackpot games today, sportpesa midweek jackpot prediction this week, sportpesa midweek jackpot correct prediction";
        page_title = "Sportpesa Midweek TZ Jackpot Predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/betika-midweek-jackpot-predictions"){
        title ="Betika Midweek Jackpot Prediction";
        meta_desc_content = "Betika Midweek Jackpot Prediction is available for free on FreeWinningTips. With our reliable Predictions, you stand a chance to claim your bonus for this week";
        meta_keywords = "betika midweek jackpot prediction, betika midweek jackpot bonus, betika midweek jackpot prediction this week, betika midweek jackpot prediction cheerplex, betika midweek jackpot predictions, 100 betika midweek jackpot prediction, free betika midweek jackpot prediction, betika midweek jackpot tips, betika midweek predictions";
        page_title = "Free Betika Midweek Jackpot Prediction";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/sportpesa-mega-jackpot-predictions"){
        title ="SportPesa Mega Jackpot Prediction - 17 Games";
        meta_desc_content = "Get Sportpesa Mega Jackpot Prediction this weekend for free. Our Jackpot has 17 games well analyzed to help you win a bonus or JP Prize of up to 320 Million ";
        meta_keywords = "Sportpesa mega jackpot prediction, free sportpesa mega jackpot prediction, mega jackpot prediction this week, jackpot prediction - 17 games today, sportpesa mega jackpot, sportpesa mega jackpot predictions this weekend";
        page_title = "Sportpesa Mega Jackpot Predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/sportpesa-supa-jackpot-tanzania-predictions"){
        title ="Sportpesa Tanzania TZ Jackpot Predictions | FreeWinningTips";
        meta_desc_content = "Get free Sportpesa Tanzania TZ Jackpot Predictions from a trusted partner. FreeWinningTips is here to help you win the Rafiki Bonuses Today and this Week";
        meta_keywords = "Sportpesa mega jackpot prediction, free sportpesa mega jackpot prediction, sportpesa mega jackpot prediction this week, sportpesa mega jackpot prediction - 17 games today, sportpesa mega jackpot, sportpesa mega jackpot predictions, sportpesa mega jackpot predictions this weekend, cheerplex sportpesa mega jackpot prediction, accurate sportpesa mega jackpot predictions, sportpesa mega jackpot results";
        page_title = "Sportpesa Supa Tanzania TZ Jackpot Predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/sporty-bet-jackpot-predictions"){
        title ="Sportybet Jackpot Predictions & Sporty Bet Tips";
        meta_desc_content = "Looking for Sportybet Jackpot Predictions for this Weekend? Visit FreeWinningTips Today for free reliable Tips and win Sporty Bet Jackpot Prizes and Bonus";
        meta_keywords = "sportybet jackpot predictions, sportybet jackpot tips, sportybet jackpot prediction this weekend, sportybet jackpot bonus, sportybet jackpot prizes";
        page_title = "Sportybet Jackpot Predictions & Bonus";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/betpawa-jackpot-predictions"){
        title ="Betpawa Pick 13 & 17 Jackpot Prediction and Bonuses";
        meta_desc_content = "Get Betpawa Jackpot Prediction for free on FreeWinningTips. We cover Jackpot Predictions for Today, Tomorrow, and this Weekend with a focus on winning a bonus";
        meta_keywords = "betpawa jackpot, betpawa jackpot prediction,betpawa jackpot predictions,betpawa jackpot prediction kenya,betpawa jackpot bonus,betpawa jackpot prediction taifa tips,betpawa jackpot predictions,cheerplex betpawa jackpot prediction,betpawa jackpot prediction tomorrow,betpawa jackpot predictions this weekend";
        page_title = "Betpawa Pick 13 & 17 Jackpot Predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.pathname.substring(1) == "jackpots/merrybet-jackpot-predictions"){
        title ="Merrybet Jackpot Predictions for Today & Tomorrow";
        meta_desc_content = "Access Merrybet Jackpot Predictions for Today and Tomorrow for free on FreeWinningTips. We are here to help you Win Jackpot Prizes & Bonuses";
        meta_keywords = "Merrybet Jackpot Predictions, Merrybet Jackpot Free Predictions, Merrybet Jackpot Predictions Today, Merrybet Jackpot Predictions Tomorrow";
        page_title = "Free Merrybet Jackpot Predictions";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    
    } else if(router.pathname.substring(1) == "jackpots/betking-jackpot-predictions"){
        title ="Betking Jackpot Predictions - Pick 11 Predictions";
        meta_desc_content = "Free Betking Jackpot Predictions are now offered on FreeWinningTips. Visit us today and win your bonus by using well-analyzed Pick 11 Jackpot Predictions";
        meta_keywords = "Betking Jackpot Predictions, betking pick 11 jackpot predictions, Betking Jackpot Rules, Betking Jackpot Bonus";
        page_title = "Betking Jackpot Predictions & Bonus";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);    

    } else if(router.pathname.substring(1) == "predictions/must-win-teams-today"){
        title ="Must Win Teams Today With 10 Teams To Win Today";
        meta_desc_content = "Looking for must win teams today? Trust FreeWinningTips for the most accurate predictions, insights, and strategies for a winning betting experience.";
        meta_keywords = "must win teams today, big win, 10 teams to win today, winning, 10 teams, win with big odd";
         page_title = "10 Teams to win today- With Big Odds";
    
        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);    

    //Competitor Pages
    } else if(router.asPath.substring(1) == "predictions/sokafans"){

        title ="Sokafans Tips and Soka Fans Jackpot Predictions";
        meta_desc_content = "Are you looking for Sokafans Prediction Today? FreeWinningTips platform offers 100% sure Soka Fans Tips and Jackpot Predictions to our customers for free";
        meta_keywords = "sokafans, sokafans tips today, sokafans prediction, sokafan tips, sokafans prediction today, sokafans tips today prediction, sokafans tips, sokafans free tips today, sokafans predictions, sokafans mega jackpot prediction, soka fan prediction";
        page_title = "Sokafans Tips Today Prediction"; 

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/sunpel"){

        title ="Sunpel Tips and Jackpot Prediction Today";
        meta_desc_content = "Sunpel Prediction, including correct scores, btts tips, and Jackpot predictions are now available for free. Enjoy reliable games everyday only on Freewinningtips";
        meta_keywords = "sunpel, sunpel tips, sunpel prediction, sunpel jackpot prediction, sunpel tips today, sunpel prediction today, sunpel jackpot, sunpel btts tips";
        page_title = "Sunpel Prediction Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/mwanasoka"){

        title ="Mwanasoka Tips and Jackpot Prediction";
        meta_desc_content = "Are you looking for Mwanasoka Tips or Jackpot Predictions? FreeWinningTips is your most reliable platform offering free betting tips for today and this weekend";
        meta_keywords = "Mwanasoka, Mwanasoka tips, Mwanasoka tips today prediction,Mwanasoka tips, mwanasoka free tips, Mwanasoka prediction, Mwanasoka free tips today, Mwanasoka predictions, Mwanasoka prediction today, mwanasoka jackpot prediction, mwanasoka mega jackpot prediction, mwanasoka tips daily";
        page_title = "Mwanasoka Free Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/betpera"){

        title ="Betpera Tips and Prediction Today";
        meta_desc_content = "Betpera Prediction Tips are available daily on FreeWinningTips. Take advantage of our wide selection of matches from more than 200 leagues  and start winning";
        meta_keywords = "betpera, betpera prediction, betpera tips today, betpera prediction today, betpera weekend prediction, betpera predictions, betpera correct scores,betpera midweek jackpot prediction, betpera tomorrow predictions, betpera football prediction";
        page_title = "Betpera Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/direct-win-predictions"){

        title ="Direct Win Predictions and Tips Today";
        meta_desc_content = "Direct win predictions and banker tips are available daily on FreeWinningTips. Get high-confidence football picks from more than 200 leagues and start winning today.";
        meta_keywords = "direct win predictions, direct win tips, direct win prediction today, direct win tips today, direct win football prediction, banker tips today, direct win weekend prediction, direct win correct score";
        page_title = "Direct Win Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/todays-predictions"){

        title ="Today's Football Predictions & Free Betting Tips";
        meta_desc_content = "Browse today's football predictions with 1X2, over/under, and double chance tips. FreeWinningTips covers major leagues worldwide with daily free picks and analysis.";
        meta_keywords = "today football predictions, todays predictions, football tips today, soccer predictions today, free betting tips today, 1x2 predictions today, today match predictions";
        page_title = "Today's Football Predictions";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/all-predictions"){

        title ="All Football Predictions Today | Every Market";
        meta_desc_content = "View all football predictions for today in one place — 1X2, BTTS, over/under, double chance, and more. Free daily tips from FreeWinningTips across 200+ leagues.";
        meta_keywords = "all predictions today, all football predictions, football predictions all markets, free predictions today, soccer tips today, betting predictions today";
        page_title = "All Predictions for Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/double-chance"){

        title ="Double Chance Predictions Today | Free 1X, X2, 12 Tips";
        meta_desc_content = "Free double chance football predictions for today. Get 1X, X2, and 12 picks with analysis on form, odds, and match stats from FreeWinningTips.";
        meta_keywords = "double chance predictions, double chance tips today, 1x double chance, x2 tips, 12 predictions, dc football tips, double chance betting tips";
        page_title = "Double Chance Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/gg-no-gg"){

        title ="BTTS Predictions Today | GG & NG Football Tips";
        meta_desc_content = "Both teams to score (GG) and no-GG predictions for today's matches. Free BTTS tips with probabilities and expert analysis on FreeWinningTips.";
        meta_keywords = "btts predictions, gg tips today, both teams to score, gg ng predictions, btts tips today, goals both teams, soccer btts tips";
        page_title = "GG / NG Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/draw"){

        title ="Draw Football Predictions Today | Free Draw Tips";
        meta_desc_content = "Draw predictions for today's football matches. Find X tips and high-probability draw picks with stats-backed analysis from FreeWinningTips.";
        meta_keywords = "draw predictions, draw tips today, football draw tips, x predictions, draw betting tips, soccer draw predictions";
        page_title = "Draw Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/accumulator-tips"){

        title ="Accumulator Tips Today | Free Acca Predictions";
        meta_desc_content = "Free accumulator tips and acca predictions for today and the weekend. Build multi-bet slips with analyzed picks from leagues around the world on FreeWinningTips.";
        meta_keywords = "accumulator tips, acca tips today, accumulator predictions, football acca tips, multibet tips, acca predictions today, betting accumulator";
        page_title = "Accumulator Tips Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/best-free-football-prediction-website"){

        title ="Best Free Football Prediction Website | FreeWinningTips";
        meta_desc_content = "FreeWinningTips is a top free football prediction website with daily tips, jackpots, VIP picks, and coverage of 200+ leagues. Compare why bettors use us for free winning tips.";
        meta_keywords = "best free football prediction website, best prediction site free, free football tips site, accurate prediction website, free soccer prediction site";
        page_title = "Best Free Football Prediction Website";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(current_url == "blog"){

        title ="Football Betting Blog | Tips, Guides & News";
        meta_desc_content = "Read the FreeWinningTips blog for football betting guides, prediction strategies, jackpot insights, and weekly analysis to improve your betting decisions.";
        meta_keywords = "football betting blog, soccer tips blog, betting guides, prediction tips blog, freewinningtips blog";
        page_title = "Football Betting Blog";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(/^\/blog\/[^/]+/.test(router.asPath.split('?')[0])){

        const slug = router.asPath.split('?')[0].replace(/^\/blog\//, '');
        const articleTitle = slug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());

        title = `${articleTitle} | FreeWinningTips Blog`;
        meta_desc_content = `Read ${articleTitle} on the FreeWinningTips blog — football betting insights, tips, and guides updated for readers worldwide.`;
        meta_keywords = `${slug.replace(/-/g, ', ')}, football blog, betting tips, freewinningtips`;
        page_title = articleTitle;

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/venasbet"){

        title ="Venasbet Prediction tips and Jackpot Predictions";
        meta_desc_content = "FreeWinningTips is now offering Venasbet Prediction and Single Bet of the Day at zero cost. Get started today and keep winning with our free reliable packages";
        meta_keywords = "venasbet,venasbet prediction,venasbet tips, venasbet prediction today, venasbet draw,venasbet predictions,venasbet jackpot prediction,venasbet single bet of the day,venasbet correct score prediction, venas midweek jackpot predictions";
        page_title = "Venasbet Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/betnumbers-prediction"){

        title ="Betnumbers Prediction Today and Bet Numbers Free Tips";
        meta_desc_content = "Betnumbers Prediction today, gg, and Correct score Predictions are available on FreeWinningTips. Get to win daily with matches from 200 leagues at zero cost";
        meta_keywords = "betnumbers,betnumbers prediction,betnumbers prediction today, betnumbers today, today's betnumbers predictions, betnumbers predictions, betnumbers predictions today, betnumbers predictions today, betnumbers prediction for today, betnumbers today prediction today, betnumbers free tips";
        page_title = "Betnumbers Free Tips for Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/zulubet"){

        title ="Zulubet predictions for today & Tomorrow";
        meta_desc_content = "Get Zulubet Predictions today from a reliable partner at no cost. We provide single bets and Zulubet Jackpot Prediction for tomorrow and the weekend for free";
        meta_keywords = "zulubet, zulubet prediction, zulubet mega jackpot prediction, zulubet predictions, zulubet predictions for tomorrow, zulubet prediction today,  zulubet jackpot prediction";
        page_title = "Zulubet Prediction: Football Tips for Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/supatips"){

        title ="Supa Tips Prediction & Supatips Jackpot Predictions";
        meta_desc_content = "Get Supatips Prediction Today, GG and Mega Jackpot Prediction. We offer free and reliable Supa Tips predictions and 254 supatips for today and tomorrow";
        meta_keywords = "supatips, supatips prediction,supatips predictions, supatips mega jackpot prediction, supatips prediction today, supatips gg, 254 supatips, supatips jackpot prediction,Supatips football prediction, free supatips, supatips tomorrow";
        page_title = "Supatips Football Prediction";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/cheerplex"){

        title ="Cheerplex Prediction and Jackpot Tips Today";
        meta_desc_content = "Get Cheerplex Predictions Today, Midweek, or Mega Jackpot Prediction for free. We offer the best Cheerplex Tips that will help you win any matches effortlessly";
        meta_keywords = "cheerplex, cheerplex jackpot prediction, cheerplex prediction, cheerplex prediction today, cheerplex predictions, cheerplex tips, cheerplex mega jackpot prediction, cheerplex sportpesa mega jackpot prediction, cheerplex midweek jackpot prediction, cheerplex betika jackpot prediction today";
        page_title = "Cheerplex Prediction Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/primatips"){

        title ="Primatips Prediction and Prima Tips Jackpot Predictions";
        meta_desc_content = "Get Primatips Predictions Today from a well-trusted partner. Our  Prima Tips consist of  Correct Scores, GG, and Jackpot Predictions given as free football tips";
        meta_keywords = "primatips, prima tips,primatips correct score, primatips prediction, primatips predictions, prima tips predictions, primatips tomorrow, primatips jackpot predictions, primatips predictions today, prima tips today predictions, prima tips today, prima tips yesterday,prima tips jackpot prediction";
        page_title = "Primatips Predictions Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/254-sure-tips"){

        title ="254 Sure Tips Today ⚽ & Jackpot Prediction";
        meta_desc_content = "Get 254 Sure Tips, Correct Score, Top Sure Wins, and GG Predictions for free. We provide 254 Sure Tips Jackpot Prediction Today, Tomorrow, and Weekend";
        meta_keywords = "254 sure tips,254 sure tips today,254 sure tips tomorrow, 254 sure tips weekend, sure tips for today, genius sure tips, Free 254 Sure Tips Prediction Today, 254 Sure Tips Jackpot Predictions, 254 Sure Tips Correct Score, 254 Sure Jackpot Prediction";
        page_title = "Free 254 Sure Tips Prediction Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/liobet"){

        title ="Liobet tips and Jackpot Prediction";
        meta_desc_content = "Get Liobet Prediction, correct scores and Jackpot Prediction at zero cost. We also offer free and reliable jambofutaa liobet tips and upcoming matches everyday";
        meta_keywords = "Liobet, Liobet tips today, Liobet tips today prediction, Liobet tips, Liobet prediction, Liobet free tips today, Liobet predictions, Liobet prediction today, Liobet mega jackpot prediction";
        page_title = "Liobet Prediction for Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/adibet"){

        title ="Adibet Tips and Predictions Today";
        meta_desc_content = "Get Adibet Predictions Today Picks without spending a dime. Our free package consists of daily Adibet Tips, Correct Scores, GG, and Mega Jackpot Prediction";
        meta_keywords = "adibet, adibet prediction, adibet predictions, adibet mega jackpot predictions, adibet jackpot prediction, adibet tips, adibet predictions today, adibet correct scores, adibet gg prediction, adibet ht/ft predictions";
        page_title = "Adibet Prediction Kenya and Today Picks";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/predictz"){

        title ="Predictz Prediction Today, Tomorrow and Jackpot Prediction";
        meta_desc_content = "Get reliable Predictz Prediction Today without paying a dime. We offer free Surebet tips, Correct Score, GG Predictz, and Mega Jackpot Prediction for everyday";
        meta_keywords = "predictz, predictz prediction today, predictz today prediction tips, predictz tomorrow prediction, predictz correct score, predictz tips, predictz mega jackpot prediction,surebet predictz,gg predictz, victor predictz, predictz yesterday prediction, predictz jackpot prediction today";
        page_title = "Predictz Today Prediction Tips";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/betensured"){

        title ="Betensured Tips and Mega Jackpot Prediction Today";
        meta_desc_content = "Get Betensured Prediction and Mega Jackpot Prediction at zero cost. We offer free Betensured Tips, correct score and gg predictions for today and tomorrow";
        meta_keywords = "betensured, betensured tips, betensured predictions, betensured prediction today, betensured mega jackpot prediction, betensured predictions today, betensured jackpot prediction, betensured gg, betensured correct score, betensured prediction tomorrow, betensured football predictions & tips";
        page_title = "Betensured Football Predictions & Tips";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/tips180"){

        title ="Tips 180 Predictions Today and Tips180 Jackpot Prediction";
        meta_desc_content = "Get 180 tips predictions for Today and Mega Jackpot Prediction for free. Our Tips180 predictions are well analyzed to ensure success in matches of all markets";
        meta_keywords = "tips180, tips180 jackpot prediction, tips180 prediction today, tips180 predictions today, betting tips180, tips180 ht/ft, tips180 forebet, tips180 today prediction, tips180 mega jackpot prediction, 180 tips today, tips180 correct score";
        page_title = "180 Tips Prediction for Today";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/premium-soccer-betting-tips"){

        title ="Everyday Winning and Guaranteed Correct Score Tips";
        meta_desc_content = "Are you Looking for VIP Premium Tips 100 Guarantee Win? FreeWinningTips offers daily VIP tips and Jackpot Predictions for free and premium packages";
        meta_keywords = "premium football tips,everyday winning tips, free vip tips today, guaranteed correct score tips, premium tips today,sure premium tips, vip premium tips 100 guarantee win";
        page_title = "Premium Football Tips - Guaranteed Correct Score Predictions";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/soccervista-predictions"){

        title ="Soccervista Sure Win and Jackpot Predictions";
        meta_desc_content = "Get free Soccervista Predictions without using a cent. We also provide Bet of the day soccer vista and Jackpot Predictions for Today and Tomorrow";
        meta_keywords = "soccervista predictions ,soccervista predictions today, zulubet soccervista, bet of the day soccervista, soccervista sure win prediction, soccervista tomorrow, soccervista jackpot predictions";
        page_title = "Soccervista Predictions Today, Tomorrow";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
        
    } else if(router.asPath.substring(1) == "predictions/free-betting-tips-today"){

        title ="Free Football Betting Tips Today";
        meta_desc_content = "Are you looking for Football Betting Tips and Predictions Today? FreeWinningTips provides Free, Bet of the day, Premium Multi-bets, and Jackpot Predictions";
        meta_keywords = "free betting tips today, betting tips today, betting tips free, betting tips win, betting tips daily";
        page_title = "Free Football Betting Tips Today and Jackpot Predictions";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);

    } else if(router.asPath.substring(1) == "predictions/free-football-prediction-today"){

        title ="Best Football Predictions Sites";
        meta_desc_content = "FreeWinningTips provides tips across all popular markets. Join us and start making profit after profit by using the best football prediction website for free";
        meta_keywords = "football predictions 365, best football predictions sites in the world,Football prediction sites today,best football prediction website free";
        page_title = "Best Free Football Prediction & Jackpot Predictions";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
        
    } else if(router.asPath.substring(1) == "predictions/direct-win-prediction"){

        title ="Direct Win Football Predictions(100%)";
        meta_desc_content = "FreeWinningTips provides quality daily Direct Win football predictions and free betting tips for football fans worldwide";
        meta_keywords = "Direct Win Prediction";
        page_title = "Direct Win Prediction";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    } else if (router.asPath.includes('/league/')) {
        const asPath = router.asPath.split('?')[0];
        const segments = asPath.split('/').filter(Boolean);
        const leagueSlug = segments[segments.length - 1] || '';
        const countrySegment = segments[1] || '';

        const leagueParsed = parseLeagueSlug(leagueSlug);
        const countryParsed = parseCountrySegment(countrySegment);

        const leagueTitle = leagueParsed?.displayLeagueName || 'League';
        const countryTitle = countryParsed?.displayCountryName || '';

        title = `${leagueTitle} Predictions Today | 1X2 Football Tips`;
        meta_desc_content = `Free ${leagueTitle} predictions and 1X2 tips${countryTitle ? ` for ${countryTitle}` : ''}. Today's matches and upcoming fixtures with expert analysis on FreeWinningTips.`;
        meta_keywords = `${leagueTitle.toLowerCase()} predictions, ${leagueTitle.toLowerCase()} tips today, ${leagueTitle.toLowerCase()} 1x2, ${countryTitle.toLowerCase()} football predictions, ${leagueTitle.toLowerCase()} fixtures`;
        page_title = `${leagueTitle} Predictions & Tips`;

        meta_content_array.push(title, meta_desc_content, meta_keywords, page_title);

    } else if (
        current_url &&
        !current_url.startsWith('auth/') &&
        !current_url.startsWith('api/') &&
        current_url !== 'blog/[slug]'
    ) {
        title = "FreeWinningTips | Free Football Predictions & Betting Tips";
        meta_desc_content = "Free daily football predictions, jackpot tips, and betting analysis on FreeWinningTips. Covering 200+ leagues with 1X2, BTTS, over/under, and VIP packages.";
        meta_keywords = "free winning tips, football predictions, free betting tips, soccer predictions, jackpot predictions";
        page_title = "Free Football Predictions";

        meta_content_array.push(title, meta_desc_content, meta_keywords, page_title);

    } else if(current_url ==="") {
        //Homepage url descriptions (route "/")
        title ="Best and Accurate Prediction Site for Football Betting Tips	";
        
        meta_desc_content = "FreeWinningTips offers the best and accurate predictions. Explore free tips, strategies, and insights to improve your betting game and win more often!.";
        meta_keywords = "best prediction site, direct win prediction, accurate prediction site,  football prediction today, best football tips for today, football tips today,today football prediction tips, free prediction today, best football prediction today, winning tips today, everyday winnig tips, free winning tips";
        page_title = "Direct Win Prediction - Everyday Winning Tips";

        meta_content_array.push(title,meta_desc_content,meta_keywords,page_title);
    }
    
    return meta_content_array;
}

export default MetaContent;
