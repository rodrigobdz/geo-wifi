import test from 'ava';
import inquirer from 'inquirer';
import geoWifi from '.';

const SSID = 'ICE71Guest';
const inquirerResult = {answer: 'ICE71'};

test.beforeEach(() => {
	inquirer.prompt = () => Promise.resolve(inquirerResult);
});

test('tokenizeSsid', async t => {
	t.deepEqual(await geoWifi.tokenizeSsid(SSID), ['ICE71', 'Guest']);
});

test('askUserQueryFromSsid', async t => {
	t.deepEqual(await geoWifi.askUserQueryFromSsid(SSID), inquirerResult);
});
